import { StyledButton } from "../../../components/buttons/styles";
import {
  StyledButtonContainer,
  StyledLockedInputContainer,
} from "../../../components/form/styles";
import { BaseVenue, GeoLocation } from "../../../shared/types";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: () => void;
  onBack?: () => void;
  defaultValues: BaseVenue;
}

export const Confirmation: React.FC<Props> = ({
  onSubmit,
  onBack,
  defaultValues,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });
  const handleFormSubmit = () => {
    onSubmit();
  };
  const getlocationDetails = (location?: GeoLocation) => {
    let label = "Location";
    let value = "unknown";
    if (!location) {
      return { label, value };
    }
    switch (true) {
      case !!location.address:
        label = "Address";
        value = location.address;
        break;
      case !!location.city:
        label = "City";
        value = location.city;
        break;
      case !!location.country:
        label = "Country";
        value = location.country;
        break;
      default:
        break;
    }
    return { label, value };
  };

  const { label, value } = getlocationDetails(defaultValues.location);
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <StyledLockedInputContainer>
        <label htmlFor="location">{label}</label>
        <input disabled type="text" id="location" value={value} />
      </StyledLockedInputContainer>
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
        {Object.entries(defaultValues.meta)
          .filter(([, value]) => value)
          .map(([key]) => (
            <span key={key}>{key}</span>
          ))}
      </div>
      <div>
        {defaultValues.media?.map((el, index) => (
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
        <StyledButton type="button" onClick={onBack} $variant="secondary">
          Back
        </StyledButton>
      </StyledButtonContainer>
    </form>
  );
};
