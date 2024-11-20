import { useParams } from "react-router-dom";
import { useFormStore } from "./../../stores/useMultiStepStore";
import { DeleteModal } from "../../components/modals/deleteModal";
import { useModalStore } from "../../stores/useModalStore";
import { EditProfile } from "./profile";
import { useEffect } from "react";
import { EditBooking } from "./booking";
import { EditVenue } from "./venue";

export const Edit: React.FC = () => {
  const { openModal } = useModalStore();
  const reset = useFormStore((state) => state.resetSteps);
  useEffect(() => {
    reset();
  }, [reset]);

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
  if (!type) {
    return <div></div>;
  }
  if (id) {
    return (
      <main>
        <DeleteModal title="Want to say Goodbye?" id={id} type={type} />
        <h1>Edit {type}</h1>
        <div>{renderEditType()}</div>
        <button onClick={openModal}>I want to remove my {type}</button>
      </main>
    );
  }
  return (
    <main>
      <h1>Edit {type}</h1>
      <div>{renderEditType()}</div>
    </main>
  );
};
