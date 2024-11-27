import { Loader } from "../../../components/loaders";
import { useRegister } from "../../register/useRegister";
import { useFormStore } from "../../../stores/useMultiStepStore";
import { Venue } from "../../../shared/types";
import { useEffect } from "react";
import {
  StyledProgressContainer,
  StyledProgressBar,
} from "../../../components/form/styles";
import { Location } from "../../list_venue/forms/location";
import { Amenities } from "../../list_venue/forms/amenities";
import { Confirmation } from "../../list_venue/forms/confirmation";
import { Information } from "../../list_venue/forms/information";
import { Media } from "../../list_venue/forms/media";
import { Pricing } from "../../list_venue/forms/pricing";
import { StyledFormWrapper } from "../../signin/styles";
import { Link } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";

export const EditVenue: React.FC<{ id: string | undefined }> = ({ id }) => {
  const { data, isLoading, error } = useApi<Venue>(`holidaze/venues/${id}`);

  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <div>ka</div>;
  }

  return (
    <div>
      <FormContainer data={data} />
      <p>{error}</p>
    </div>
  );
};

interface Props {
  data: Venue;
}
const FormContainer: React.FC<Props> = ({ data }) => {
  const { updateVenue, isError, isLoading, isSuccessful } = useRegister();
  const { step, venue, setNext, setPrev, setVenueState } = useFormStore();

  useEffect(() => {
    setVenueState({
      name: data.name,
      description: data.description,
      media: data.media,
      price: data.price,
      maxGuests: data.maxGuests,
      rating: data.rating,
      meta: data.meta,
      location: data.location,
    });
  }, [data, setVenueState]);

  const totalSteps: number = 6;
  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <Location
            onSubmit={(data) => {
              setVenueState(data);
              setNext();
            }}
            defaultValues={venue.location}
          />
        );
      case 2:
        return (
          <Information
            onSubmit={(data) => {
              setVenueState(data);
              setNext();
            }}
            onBack={() => setPrev()}
            defaultValues={{ name: venue.name, description: venue.description }}
          />
        );
      case 3:
        return (
          <Media
            onSubmit={(data) => {
              setVenueState(data);
              setNext();
            }}
            onBack={() => setPrev()}
            defaultValues={{ media: venue.media }}
          />
        );
      case 4:
        return (
          <Pricing
            onSubmit={(data) => {
              setVenueState(data);
              setNext();
            }}
            onBack={() => setPrev()}
            defaultValues={{
              price: venue.price,
              maxGuests: venue.maxGuests,
              rating: venue.rating,
            }}
          />
        );
      case 5:
        return (
          <Amenities
            onSubmit={(meta) => {
              setVenueState(meta);
              setNext();
            }}
            onBack={() => setPrev()}
            defaultValues={venue.meta}
          />
        );
      case 6:
        return (
          <Confirmation
            onSubmit={() => {
              updateVenue(data.id, venue);
            }}
            onBack={() => setPrev()}
            defaultValues={venue}
          />
        );
      default:
        break;
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isSuccessful) {
    return (
      <div>
        <h2>Succesfully updated your Venue</h2>
        <Link to={"/venue/" + data.id}>View Venue</Link>
      </div>
    );
  }
  return (
    <StyledFormWrapper>
      <StyledProgressContainer>
        <StyledProgressBar $percent={step / totalSteps} />
      </StyledProgressContainer>
      {renderSteps()}
      <p>{isError}</p>
    </StyledFormWrapper>
  );
};
