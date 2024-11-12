import { useForm } from "react-hook-form";
import { StyledButton } from "../../../components/buttons/styles";
import {
  StyledButtonContainer,
  StyledCheckAmenities,
} from "../../../components/form/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { Meta } from "../../../shared/types";
import { useBoundStore } from "../../../stores/useVenueStore";

export const Amenities: React.FC = () => {
  const goToNextStep = useMultiStepStore((state) => state.setNext);
  const goToPrevStep = useMultiStepStore((state) => state.setPrev);
  const { setMetaState, venue } = useBoundStore();
  const { register, handleSubmit } = useForm<Meta>({
    defaultValues: venue.meta,
  });
  const onSubmit = (meta: Meta) => {
    setMetaState(meta);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "700px" }}>
      <h2>Amenities (optional)</h2>
      <p>
        Make your venue stand out by highlighting the key features that guests
        will enjoy during their stay. Select all that apply from the options
        below
      </p>
      <StyledCheckAmenities>
        <input type="checkbox" id="wifi" {...register("wifi")} />
        <label htmlFor="wifi">Free WIFI</label>
      </StyledCheckAmenities>
      <StyledCheckAmenities>
        <input type="checkbox" id="parking" {...register("parking")} />
        <label htmlFor="parking">Parking Included</label>
      </StyledCheckAmenities>
      <StyledCheckAmenities>
        <input type="checkbox" id="breakfast" {...register("breakfast")} />
        <label htmlFor="breakfast">Breakfast Available</label>
      </StyledCheckAmenities>
      <StyledCheckAmenities>
        <input type="checkbox" id="pet" {...register("pets")} />
        <label htmlFor="pet">Pet Friendly</label>
      </StyledCheckAmenities>

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
