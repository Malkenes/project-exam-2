import {
  StyledButtonContainer,
  StyledCheckContainer,
  StyledFormError,
} from "../../../components/form/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { useUserStore } from "../../../stores/useUserStore";
import { useForm } from "react-hook-form";
import { useRegister } from "../useRegister";
import { Loader } from "../../../components/loaders";
import { StyledButton } from "../../../components/buttons/styles";
import { StyledOrderedList } from "../styles";
import { RegisterData } from "../../../shared/types";

export const VenueManager: React.FC = () => {
  const goToPrevStep = useMultiStepStore((state) => state.setPrev);
  const updateStore = useUserStore((state) => state.setRegisterState);
  const defaultValues = useUserStore((state) => state.registerData);
  const { register, handleSubmit } = useForm({
    defaultValues,
  });
  const { reg, isError, isLoading } = useRegister();

  const onSubmit = (data: RegisterData) => {
    updateStore(data);
    const datatoApi = useUserStore.getState().getRegisterValues();
    reg(datatoApi);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <StyledButton type="submit" variant="primary">
          Submit
        </StyledButton>
        <StyledButton type="button" onClick={goToPrevStep} variant="secondary">
          Back
        </StyledButton>
      </StyledButtonContainer>
      <StyledFormError>{isError}</StyledFormError>
    </form>
  );
};
