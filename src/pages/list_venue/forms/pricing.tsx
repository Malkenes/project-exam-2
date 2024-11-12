import { StyledButton } from "../../../components/buttons/styles";
import { FormFieldset } from "../../../components/form/formFieldset";
import {
  StyledButtonContainer,
  StyledErrorContainer,
  StyledInputContainer,
} from "../../../components/form/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useBoundStore } from "../../../stores/useVenueStore";

const schema = yup
  .object({
    price: yup.number().required(),
  })
  .required();

export const Pricing: React.FC = () => {
  const goToNextStep = useMultiStepStore((state) => state.setNext);
  const goToPrevStep = useMultiStepStore((state) => state.setPrev);
  const { venue, setVenueState } = useBoundStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: venue,
    resolver: yupResolver(schema),
  });
  const onSubmit = (venue: { price: number }) => {
    setVenueState(venue);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Pricing and guests</h2>
      <p>
        Provide clear details about your venue's pricing, capacity, and rating
        to help potential guests find the best fit for their needs.
      </p>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input
            type="text"
            placeholder="Price"
            id="price"
            {...register("price")}
          />
          <label htmlFor="price">Price</label>
        </StyledInputContainer>
        <p>{errors.price?.message}</p>
      </StyledErrorContainer>
      <FormFieldset
        name="Max Guests"
        max={10}
        selectedValue={venue.maxGuests}
        onChange={(guest) => setVenueState({ maxGuests: guest })}
      />
      <FormFieldset
        name="Rating"
        max={5}
        selectedValue={venue.rating}
        onChange={(rating) => setVenueState({ rating: rating })}
      />
      <StyledButtonContainer>
        <StyledButton type="submit" $variant="primary">
          Continue
        </StyledButton>
        <StyledButton type="button" onClick={goToPrevStep} $variant="secondary">
          Back
        </StyledButton>
      </StyledButtonContainer>
    </form>
  );
};
