import { StyledButton } from "../../../components/buttons/styles";
import { StyledButtonContainer } from "../../../components/form/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";

export const Confirmation: React.FC = () => {
  const goToNextStep = useMultiStepStore((state) => state.reset);
  const goToPrevStep = useMultiStepStore((state) => state.setPrev);
  return (
    <form onSubmit={goToNextStep}>
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
