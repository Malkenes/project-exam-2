import {
  StyledProgressContainer,
  StyledProgressBar,
  StyledFormError,
} from "../../../components/form/styles";
import { useHolidazeStore } from "../../../stores";
import { Personal } from "./personal";
import { VenueManager } from "./venueManager";
import { Avatar } from "./avatar";
import { Banner } from "./banner";
import { useRegister } from "../useRegister";
import { Loader } from "../../../components/loaders";
import { Link } from "react-router-dom";
import { StyledFormWrapper } from "../styles";

export const MultiSteps: React.FC = () => {
  const { reg, isError, isLoading, isSuccessful } = useRegister();
  const { step, registerUser, setNext, setPrev, setRegisterUserState } =
    useHolidazeStore();

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
    <>
      <StyledProgressContainer>
        <StyledProgressBar $percent={step / totalSteps} />
      </StyledProgressContainer>
      <StyledFormWrapper>
        {renderSteps()}
        <StyledFormError>{isError}</StyledFormError>
      </StyledFormWrapper>
    </>
  );
};
