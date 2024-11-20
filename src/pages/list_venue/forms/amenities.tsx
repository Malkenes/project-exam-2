import { useForm } from "react-hook-form";
import { StyledButton } from "../../../components/buttons/styles";
import {
  StyledButtonContainer,
  StyledCheckAmenities,
} from "../../../components/form/styles";
import { Meta } from "../../../shared/types";

interface Props {
  onSubmit: (meta: { meta: Meta }) => void;
  onBack?: () => void;
  defaultValues?: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
}

export const Amenities: React.FC<Props> = ({
  onSubmit,
  onBack,
  defaultValues,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });
  const handleFormSubmit = (data: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  }) => {
    onSubmit({ meta: data });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{ maxWidth: "700px" }}
    >
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
        <StyledButton type="button" onClick={onBack} $variant="secondary">
          Back
        </StyledButton>
      </StyledButtonContainer>
    </form>
  );
};
