import {
  StyledProgressContainer,
  StyledProgressBar,
} from "../../../components/form/styles";
import { StyledFormWrapper } from "../styles";
import { useFormStore } from "../../../stores/useMultiStepStore";
import { Personal } from "./personal";
import { VenueManager } from "./venueManager";
import { Avatar } from "./avatar";
import { Banner } from "./banner";
import { useRegister } from "../useRegister";
import { Loader } from "../../../components/loaders";
import { Link } from "react-router-dom";

export const MultiSteps: React.FC = () => {
  const { reg, isError, isLoading, isSuccessful } = useRegister();
  const { step, registerUser, setNext, setPrev, setRegisterUserState } =
    useFormStore();

  const totalSteps: number = 4;
  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <Personal
            onSubmit={(data) => {
              setRegisterUserState(data);
              setNext();
            }}
            defaultValues={{
              name: registerUser.name,
              email: registerUser.email,
              password: registerUser.password,
              bio: registerUser.bio,
            }}
          />
        );
      case 2:
        return (
          <Avatar
            onSubmit={(avatar) => {
              setRegisterUserState(avatar);
              setNext();
            }}
            onBack={() => setPrev()}
            defaultValues={registerUser.avatar}
          />
        );
      case 3:
        return (
          <Banner
            onSubmit={(banner) => {
              setRegisterUserState(banner);
              setNext();
            }}
            onBack={() => setPrev()}
            defaultValues={registerUser.banner}
          />
        );
      case 4:
        return (
          <VenueManager
            onSubmit={(venueManager) => {
              setRegisterUserState(venueManager);
              reg(registerUser);
            }}
            onBack={() => setPrev()}
            defaultValues={{ venueManager: registerUser.venueManager }}
          />
        );
      default:
        break;
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  if (isSuccessful) {
    return (
      <div>
        <h2>Succesfully Registered</h2>
        <Link to={"/signin"}>Sign In</Link>
      </div>
    );
  }

  return (
    <StyledFormWrapper>
      <StyledProgressContainer>
        <StyledProgressBar $percent={step / totalSteps} />
      </StyledProgressContainer>
      {renderSteps()}
      <p>{isError}</p>
    </StyledFormWrapper>
  );
};
