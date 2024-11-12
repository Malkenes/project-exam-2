import { useParams } from "react-router-dom";
import {
  StyledProgressContainer,
  StyledProgressBar,
} from "./../../components/form/styles";
import { StyledFormWrapper } from "./../register/styles";
import { useMultiStepStore } from "./../../stores/useMultiStepStore";
import { EditPersonal } from "../../components/form/editPersonal";
import { EditVenueManager } from "../../components/form/editVenueManager";
import { Avatar } from "./../register/forms/avatar";
import { Banner } from "./../register/forms/banner";
import { SuccessModal } from "../../components/modals/successModal";
import { useModalStore } from "../../stores/useModalStore";

export const Edit: React.FC = () => {
  const reset = useMultiStepStore((state) => state.reset);
  reset();
  const closeModal = useModalStore((state) => state.closeModal);
  closeModal();
  const { id } = useParams();
  const renderEditType = () => {
    switch (id) {
      case "profile":
        return <EditProfile />;
      case "venue":
        return <EditVenue />;
      default:
        break;
    }
  };
  return (
    <main>
      <SuccessModal />
      <hgroup>
        <h1>Edit {id}</h1>
        <p>Where components are tested</p>
      </hgroup>
      <div>{renderEditType()}</div>
    </main>
  );
};

const EditProfile: React.FC = () => {
  const step = useMultiStepStore((state) => state.step);
  const totalSteps: number = 4;
  const renderSteps = () => {
    switch (step) {
      case 1:
        return <EditPersonal />;
      case 2:
        return <Avatar />;
      case 3:
        return <Banner />;
      case 4:
        return <EditVenueManager />;
      default:
        break;
    }
  };

  return (
    <StyledFormWrapper>
      <StyledProgressContainer>
        <StyledProgressBar $percent={step / totalSteps} />
      </StyledProgressContainer>
      {renderSteps()}
    </StyledFormWrapper>
  );
};

const EditVenue: React.FC = () => {
  const { xx } = useParams();
  console.log(xx);

  return <div>hei</div>;
};
