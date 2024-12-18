import { useParams } from "react-router-dom";
import { Media, Venue as TypeVenue } from "../../shared/types";
import { FaStar } from "react-icons/fa";
import * as S from "./styles";
import { useState } from "react";
import { FormContainer } from "./form";
import { useApi } from "../../hooks/useApi";

export const Venue: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useApi<TypeVenue>(
    `holidaze/venues/${id}?_bookings=true`,
  );
  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  if (!data || Array.isArray(data)) {
    return <div>no data</div>;
  }

  return (
    <S.StyledVenuePage>
      <div style={{ display: "flex" }}>
        <VenueImages media={data.media} />
        <div style={{ width: "40%", height: "100px" }}>
          {data.location.address}
        </div>
      </div>
      <S.StyledVenueTitle>
        <hgroup>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
        </hgroup>
      </S.StyledVenueTitle>
      <S.StyledInfoGroup>
        <div>
          This
          {data.meta.pets && " pet friendly "}
          property is perfect for up to {data.maxGuests}
          {data.maxGuests === 1 ? " guest" : " guests"}. Relax in spacious
          rooms, enjoy complimentary
          {data.meta.breakfast && " breakfast, "}
          {data.meta.wifi && " high-speed WI-FI, "}
          {data.meta.parking && " free parking, "} all while taking in the
          peaceful surroundings
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <S.StyledRating>
            <div>
              <FaStar size={24} />
              {data.rating}
            </div>
            rating by Owner
          </S.StyledRating>
          <div>
            {data.name} is praised for its stunning views and exceptional
            service. All this is available starting at just{" "}
            <span>{data.price} Bitcoin</span> per night. Book your stay today
            and create unforgettable memories.
          </div>
        </div>
        <div>
          Amenities
          {Object.entries(data.meta)
            .filter(([, value]) => value)
            .map(([key]) => (
              <div key={key}>{key}</div>
            ))}
        </div>
      </S.StyledInfoGroup>
      <div style={{ position: "relative" }}>
        <FormContainer
          venueId={data.id}
          name={data.name}
          price={data.price}
          maxGuests={data.maxGuests}
          bookings={data.bookings}
        />
      </div>
    </S.StyledVenuePage>
  );
};

const VenueImages: React.FC<{ media: Media[] }> = ({ media }) => {
  const [orderedMedia, setOrderedMedia] = useState<Media[]>(media);
  const handleClick = (index: number) => {
    const newOrder = [
      orderedMedia[index],
      ...orderedMedia.filter((_, i) => i !== index),
    ];
    setOrderedMedia(newOrder);
  };
  return (
    <S.StyledMediaGallery>
      {orderedMedia.map((item, index) => (
        <div key={index} onClick={() => handleClick(index)}>
          <img src={item.url} alt={item.alt} />
        </div>
      ))}
    </S.StyledMediaGallery>
  );
};
