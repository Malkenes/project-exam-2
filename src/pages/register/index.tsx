import { useEffect } from "react";
import { useHolidazeStore } from "../../stores";
import { MultiSteps } from "./forms/index";
import { StyledMultiStepWrapper, StyledRegister } from "./styles";

export const Register: React.FC = () => {
  const reset = useHolidazeStore((state) => state.resetSteps);
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <StyledRegister>
      <hgroup>
        <h1>Register</h1>
        <p>Your journey starts here Register to find your perfect retreat</p>
      </hgroup>
      <StyledMultiStepWrapper>
        <MultiSteps />
      </StyledMultiStepWrapper>
    </StyledRegister>
  );
};
