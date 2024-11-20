import { useForm } from "react-hook-form";
import { StyledOrderedList } from "../styles";
import { StyledButton } from "../../../components/buttons/styles";
import {
  StyledCheckContainer,
  StyledButtonContainer,
} from "../../../components/form/styles";

interface Props {
  onSubmit: (venueManager: { venueManager: boolean }) => void;
  onBack?: () => void;
  defaultValues?: { venueManager: boolean };
}

export const VenueManager: React.FC<Props> = ({
  onSubmit,
  onBack,
  defaultValues,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const handleFormSubmit = (data: { venueManager: boolean }) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Become a venue manager (Optional)</h2>
      <StyledOrderedList>
        <li>
          <strong>List your space </strong>
          <span>
            {" "}
            Fill out details about your property, including amenities, location,
            and unique features. Upload stunning photos that showcase what makes
            your space special.
          </span>
        </li>
        <li>
          <strong>Set Your Rates</strong>
          <span>
            {" "}
            Choose your pricing and availability. You have full control over
            when and how much you charge for your property.
          </span>
        </li>
        <li>
          <strong>Connect with Guests </strong>
          <span>
            {" "}
            Once your listing is live, travelers can discover your space, check
            availability, and book their stay—all through our user-friendly
            platform.
          </span>
        </li>
        <li>
          <strong>Manage Your Bookings </strong>
          <span>
            {" "}
            Stay updated with real-time notifications, manage bookings, and
            communicate with guests directly through our platform to ensure a
            smooth experience.
          </span>
        </li>
        <li>
          <strong>Get Paid </strong>
          <span>
            {" "}
            After guests check in, receive payment promptly and securely,
            allowing you to focus on providing an amazing experience for your
            visitors!
          </span>
        </li>
      </StyledOrderedList>
      <StyledCheckContainer>
        <input
          type="checkbox"
          id="venuemanager"
          {...register("venueManager")}
        />
        <label htmlFor="venuemanager">I want to be a venue manager</label>
      </StyledCheckContainer>
      <StyledButtonContainer>
        <StyledButton type="submit" $variant="primary">
          Submit
        </StyledButton>
        <StyledButton type="button" onClick={onBack} $variant="secondary">
          Back
        </StyledButton>
      </StyledButtonContainer>
    </form>
  );
};
