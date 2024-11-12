import React from "react";
import { StyledButton } from "../../../components/buttons/styles";
import {
  StyledButtonContainer,
  StyledInputContainer,
} from "../../../components/form/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";

import "Leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import { useVenueStore } from "../../../stores/useVenueStore";

export const Location: React.FC = () => {
  const goToNextStep = useMultiStepStore((state) => state.setNext);
  const loc = useVenueStore((state) => state.loc);
  const updateLoc = useVenueStore((state) => state.updateLoc);
  return (
    <form onSubmit={goToNextStep} style={{ display: "flex" }}>
      <Map />
      <div>
        <StyledInputContainer>
          <input type="text" placeholder="Continent" id="continent" />
          <label htmlFor="continent">Continent</label>
        </StyledInputContainer>
        <StyledInputContainer>
          <input
            value={loc.country}
            onChange={(e) => updateLoc({ country: e.target.value })}
            type="text"
            placeholder="Country"
            id="country"
          />
          <label htmlFor="country">Country</label>
        </StyledInputContainer>
        <StyledInputContainer>
          <input
            value={loc.city}
            onChange={(e) => updateLoc({ city: e.target.value })}
            type="text"
            placeholder="City"
            id="city"
          />

          <label htmlFor="city">City</label>
        </StyledInputContainer>
        <StyledInputContainer>
          <input
            value={loc.zip}
            onChange={(e) => updateLoc({ zip: e.target.value })}
            type="text"
            placeholder="Zip"
            id="zip"
          />
          <label htmlFor="zip">Zip</label>
        </StyledInputContainer>
        <StyledInputContainer>
          <input
            value={loc.address}
            onChange={(e) => updateLoc({ address: e.target.value })}
            type="text"
            placeholder="Address"
            id="address"
          />
          <label htmlFor="address">Address</label>
        </StyledInputContainer>
        <StyledButtonContainer>
          <StyledButton type="submit" $variant="primary">
            Continue
          </StyledButton>
        </StyledButtonContainer>
      </div>
    </form>
  );
};

const Map: React.FC = () => {
  return (
    <div style={{ height: "500px", width: "500px" }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={1}
        style={{ height: "100%" }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

const LocationMarker: React.FC = () => {
  const { setPosition, position } = useVenueStore();
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      locationDetails(e.latlng);
      const loc = useVenueStore.getState().loc;
      switch (false) {
        case !loc.address:
          map.flyTo(e.latlng, 18);
          break;
        case !loc.zip:
          map.flyTo(e.latlng, 14);
          break;
        case !loc.city:
          map.flyTo(e.latlng, 10);
          break;
        case !loc.country:
          map.flyTo(e.latlng, 4);
          break;
        default:
          break;
      }
    },
  });
  return position ? <Marker position={position} /> : null;
};
const locationDetails = async (latlng: { lat: number; lng: number }) => {
  const updateLoc = useVenueStore.getState().updateLoc;
  const location = await fetchLocationDetails(latlng);
  updateLoc(location.address);
};

const fetchLocationDetails = async (position: { lat: number; lng: number }) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`,
  );
  const result = await response.json();
  return result;
};
