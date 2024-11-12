import { StyledButton } from "../../../components/buttons/styles";
import {
  StyledButtonContainer,
  StyledFormError,
  StyledLockedInputContainer,
} from "../../../components/form/styles";
import { BaseVenue } from "../../../shared/types";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { useBoundStore } from "../../../stores/useVenueStore";
import { useForm } from "react-hook-form";
import { useRegister } from "../../register/useRegister";
import { Loader } from "../../../components/loaders";

export const Confirmation: React.FC = () => {
  const goToPrevStep = useMultiStepStore((state) => state.setPrev);
  const { venue } = useBoundStore();
  console.log(useBoundStore.getState().venue);
  const { createVenue, isError, isLoading } = useRegister();

  const { register, handleSubmit } = useForm({
    defaultValues: venue,
  });
  const onSubmit = (dataPackage: BaseVenue) => {
    console.log(dataPackage);
    createVenue(dataPackage);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledLockedInputContainer>
        <label htmlFor="name">name</label>
        <input disabled type="text" id="name" {...register("name")} />
      </StyledLockedInputContainer>
      <StyledLockedInputContainer>
        <label htmlFor="description">Description</label>
        <textarea disabled id="description" {...register("description")} />
      </StyledLockedInputContainer>
      <StyledLockedInputContainer>
        <label htmlFor="price">Price</label>
        <input disabled type="text" id="price" {...register("price")} />
      </StyledLockedInputContainer>
      <StyledLockedInputContainer>
        <label htmlFor="maxGuests">Max Guests</label>
        <input disabled type="text" id="maxGuests" {...register("maxGuests")} />
      </StyledLockedInputContainer>
      <StyledLockedInputContainer>
        <label htmlFor="rating">Rating</label>
        <input disabled type="text" id="rating" {...register("rating")} />
      </StyledLockedInputContainer>
      <div>
        <p>Meta</p>
        {Object.entries(venue.meta)
          .filter(([value]) => value)
          .map(([key]) => (
            <span key={key}>{key}</span>
          ))}
      </div>
      <div>
        {venue.media?.map((el, index) => (
          <img
            key={index}
            src={el.url}
            alt={el.alt}
            style={{ width: "50px" }}
          />
        ))}
      </div>
      <StyledButtonContainer>
        <StyledButton type="submit" $variant="primary">
          Continue
        </StyledButton>
        <StyledButton type="button" onClick={goToPrevStep} $variant="secondary">
          Back
        </StyledButton>
      </StyledButtonContainer>
      <StyledFormError>{isError}</StyledFormError>
    </form>
  );
};
