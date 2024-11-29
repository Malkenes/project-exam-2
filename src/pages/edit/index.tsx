import { useParams } from "react-router-dom";
import { DeleteModal } from "../../components/modals/deleteModal";
import { useHolidazeStore } from "../../stores";
import { EditProfile } from "./profile";
import { useEffect } from "react";
import { EditBooking } from "./booking";
import { EditVenue } from "./venue";
import { Unauthorized } from "../../components/unauthorized";

export const Edit: React.FC = () => {
  const { openModal, resetSteps, userData } = useHolidazeStore();
  useEffect(() => {
    resetSteps();
  }, [resetSteps]);

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

  if (!userData.accessToken) {
    return <Unauthorized />;
  }

  if (!type) {
    return <div></div>;
  }
  if (id) {
    return (
      <main>
        <DeleteModal title="Want to say Goodbye?" id={id} type={type} />
        <hgroup>
          <h1>Edit {type}</h1>
        </hgroup>
        <div>{renderEditType()}</div>
        <button onClick={openModal}>I want to remove my {type}</button>
      </main>
    );
  }
  return (
    <main>
      <hgroup>
        <h1>Edit {type}</h1>
      </hgroup>
      {renderEditType()}
    </main>
  );
};
