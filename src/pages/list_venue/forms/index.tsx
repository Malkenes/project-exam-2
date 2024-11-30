import {
  StyledProgressContainer,
  StyledProgressBar,
} from "../../../components/form/styles";
import { useHolidazeStore } from "../../../stores";
import { Location } from "./location";
import { Information } from "./information";
import { Media } from "./media";
import { Pricing } from "./pricing";
import { Amenities } from "./amenities";
import { Confirmation } from "./confirmation";
import { useRegister } from "../../register/useRegister";
import { Loader } from "../../../components/loaders";
import { Link } from "react-router-dom";
import { StyledVenueFormWrapper } from "./styles";

export const MultiSteps: React.FC = () => {
  const { createVenue, isError, isLoading, isSuccessful } = useRegister();

  const { step, venue, setNext, setPrev, setVenueState } = useHolidazeStore();
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
              createVenue(venue);
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
      <div style={{ textAlign: "center" }}>
        <h2>Successfully Created Venue</h2>
        <Link to={"/"}>Home</Link>
      </div>
    );
  }

  return (
    <>
      <StyledProgressContainer>
        <StyledProgressBar $percent={step / totalSteps} />
      </StyledProgressContainer>
      <StyledVenueFormWrapper>
        {renderSteps()}
        <p>{isError}</p>
      </StyledVenueFormWrapper>
    </>
  );
};
