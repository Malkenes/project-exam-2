import { useEffect } from "react";
import { EditPersonal } from "../../../components/form/editPersonal";
import {
  StyledProgressContainer,
  StyledProgressBar,
} from "../../../components/form/styles";
import { useUserStore } from "../../../stores/useUserStore";
import { Avatar } from "../../register/forms/avatar";
import { Banner } from "../../register/forms/banner";
import { VenueManager } from "../../register/forms/venueManager";
import { StyledFormWrapper } from "../../register/styles";
import { useFormStore } from "../../../stores/useMultiStepStore";
import { useRegister } from "../../register/useRegister";
import { Link } from "react-router-dom";
import { Loader } from "../../../components/loaders";

export const EditProfile: React.FC = () => {
  const { updateProfile, isError, isLoading, isSuccessful } = useRegister();
  const { step, updateUser, setNext, setPrev, setUpdateUserState } =
    useFormStore();
  const user = useUserStore((state) => state.userData);

  useEffect(() => {
    setUpdateUserState({
      bio: user.bio,
      avatar: user.avatar,
      banner: user.banner,
      venueManager: user.venueManager,
    });
  }, [user, setUpdateUserState]);

  const totalSteps: number = 4;
  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <EditPersonal
            onSubmit={(bio) => {
              setUpdateUserState(bio);
              setNext();
            }}
            defaultValues={{
              bio: updateUser.bio,
              name: user.name,
              email: user.email,
            }}
          />
        );
      case 2:
        return (
          <Avatar
            onSubmit={(avatar) => {
              setUpdateUserState(avatar);
              setNext();
            }}
            onBack={() => setPrev()}
            defaultValues={updateUser.avatar}
          />
        );
      case 3:
        return (
          <Banner
            onSubmit={(banner) => {
              setUpdateUserState(banner);
              setNext();
            }}
            onBack={() => setPrev()}
            defaultValues={updateUser.banner}
          />
        );
      case 4:
        return (
          <VenueManager
            onSubmit={(venueManager) => {
              setUpdateUserState(venueManager);
              updateProfile(updateUser);
            }}
            onBack={() => setPrev()}
            defaultValues={{ venueManager: updateUser.venueManager }}
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
        <h2>Succesfully updated your profile</h2>
        <Link to={"/"}>Go to Homepage</Link>
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
