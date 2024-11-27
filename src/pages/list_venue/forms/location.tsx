import React from "react";
import { StyledButton } from "../../../components/buttons/styles";
import {
  StyledButtonContainer,
  StyledInputContainer,
} from "../../../components/form/styles";

import "Leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import { useVenueStore } from "../../../stores/useVenueStore";
import { useForm } from "react-hook-form";
import { StyledLocation } from "./location.styles";

interface Props {
  onSubmit: (data: {
    location: {
      continent?: string;
      country?: string;
      city?: string;
      zip?: string;
      address?: string;
      lat?: number;
      lng?: number;
    };
  }) => void;
  defaultValues?: {
    continent?: string;
    country?: string;
    city?: string;
    zip?: string;
    address?: string;
    lat?: number;
    lng?: number;
  };
}

export const Location: React.FC<Props> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });
  const handleFormSubmit = (data: {
    continent?: string;
    country?: string;
    city?: string;
    zip?: string;
    address?: string;
  }) => {
    onSubmit({ location: data });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <StyledLocation>
        <Map />
        <div>
          <StyledInputContainer>
            <input
              type="text"
              placeholder="Continent"
              id="continent"
              {...register("continent")}
            />
            <label htmlFor="continent">Continent</label>
          </StyledInputContainer>
          <StyledInputContainer>
            <input
              type="text"
              placeholder="Country"
              id="country"
              {...register("country")}
            />
            <label htmlFor="country">Country</label>
          </StyledInputContainer>
          <StyledInputContainer>
            <input
              type="text"
              placeholder="City"
              id="city"
              {...register("city")}
            />
            <label htmlFor="city">City</label>
          </StyledInputContainer>
          <StyledInputContainer>
            <input
              type="text"
              placeholder="Zip"
              id="zip"
              {...register("zip")}
            />
            <label htmlFor="zip">Zip</label>
          </StyledInputContainer>
          <StyledInputContainer>
            <input
              type="text"
              placeholder="Address"
              id="address"
              {...register("address")}
            />
            <label htmlFor="address">Address</label>
          </StyledInputContainer>
          <StyledButtonContainer>
            <StyledButton type="submit" $variant="primary">
              Continue
            </StyledButton>
          </StyledButtonContainer>
        </div>
      </StyledLocation>
    </form>
  );
};

const Map: React.FC = () => {
  return (
    <div style={{ height: "500px" }}>
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
