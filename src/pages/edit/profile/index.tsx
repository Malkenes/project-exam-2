import { useEffect } from "react";
import { EditPersonal } from "../../../components/form/editPersonal";
import {
  StyledProgressContainer,
  StyledProgressBar,
} from "../../../components/form/styles";
import { Avatar } from "../../register/forms/avatar";
import { Banner } from "../../register/forms/banner";
import { VenueManager } from "../../register/forms/venueManager";
import { StyledFormWrapper } from "../../register/styles";
import { useHolidazeStore } from "../../../stores";
import { useRegister } from "../../register/useRegister";
import { Loader } from "../../../components/loaders";
import { SuccessMessage } from "../../../components/form/success";

export const EditProfile: React.FC = () => {
  const { updateProfile, isError, isLoading, isSuccessful } = useRegister();
  const { userData, step, updateUser, setNext, setPrev, setUpdateUserState } =
    useHolidazeStore();

  useEffect(() => {
    setUpdateUserState({
      bio: userData.bio,
      avatar: userData.avatar,
      banner: userData.banner,
      venueManager: userData.venueManager,
    });
  }, [userData, setUpdateUserState]);

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
              name: userData.name,
              email: userData.email,
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
      <SuccessMessage
        title="Succesfully updated your profile"
        message="View Profile"
        link="/profile"
      />
    );
  }
  return (
    <>
      <StyledProgressContainer>
        <StyledProgressBar $percent={step / totalSteps} />
      </StyledProgressContainer>
      <StyledFormWrapper>
        {renderSteps()}
        <p>{isError}</p>
      </StyledFormWrapper>
    </>
  );
};
