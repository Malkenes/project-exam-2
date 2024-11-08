import { MultiSteps } from "./forms/index";
import { StyledRegister } from "./styles";

export const Register: React.FC = () => {
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
