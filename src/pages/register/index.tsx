import { useEffect } from "react";
import { useFormStore } from "../../stores/useMultiStepStore";
import { MultiSteps } from "./forms/index";
import { StyledRegister } from "./styles";

export const Register: React.FC = () => {
  const reset = useFormStore((state) => state.resetSteps);
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <StyledRegister>
      <hgroup>
        <h1>Register</h1>
        <p>Your journey starts here Register to find your perfect retreat</p>
      </hgroup>
      <div>
        <MultiSteps />
      </div>
    </StyledRegister>
  );
};
