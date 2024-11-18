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
import { BookingForm } from "../venue/form";
import { DeleteModal } from "../../components/modals/deleteModal";
import { useModalStore } from "../../stores/useModalStore";
import { useFetchBooking } from "../../hooks/useFetch";

export const Edit: React.FC = () => {
  const reset = useMultiStepStore((state) => state.reset);
  reset();
  const { type, id } = useParams();
  const renderEditType = () => {
    switch (type) {
      case "profile":
        return <EditProfile />;
      case "venue":
        return <EditVenue id={id} />;
      case "booking":
        return <EditBooking id={id} />;
      default:
        break;
    }
  };
  return (
    <main>
      <SuccessModal />
      <DeleteModal title="Want to say Goodbye?" id={id} type={type} />
      <hgroup>
        <h1>Edit {type}</h1>
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

const EditVenue: React.FC<{ id: string | undefined }> = (id) => {
  console.log(id);

  return <div>hei</div>;
};

const EditBooking: React.FC<{ id: string | undefined }> = ({ id = "" }) => {
  const { openModal } = useModalStore();
  const { data } = useFetchBooking(id);
  console.log(data);
  return (
    <div>
      <BookingForm />
      <button onClick={openModal}>I want to remove my booking</button>
    </div>
  );
};
