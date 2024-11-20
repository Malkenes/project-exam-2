import { useModalStore } from "../../stores/useModalStore";
import { StyledModalWrapper, StyledModal } from "./styles";
import { StyledButton } from "../buttons/styles";
import { useRegister } from "../../pages/register/useRegister";
import { Loader } from "../loaders";

interface Props {
  title: string;
  type: string;
  id: string;
}
export const DeleteModal: React.FC<Props> = ({ title, id, type }) => {
  const { isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen) {
    return null;
  }

  return (
    <StyledModalWrapper>
      <StyledModal>
        <button onClick={closeModal}>close</button>
        <h2>{title}</h2>
        <p>
          Deleting your {type} will erase all its information and cannot be
          undone.
        </p>
        <div style={{ position: "relative" }}>
          <DeleteBooking id={id} type={type} />
        </div>
      </StyledModal>
    </StyledModalWrapper>
  );
};

const DeleteBooking: React.FC<{ id: string; type: string }> = ({
  id,
  type,
}) => {
  const { deleteVenue, deleteBooking, isError, isLoading, isDeleted } =
    useRegister();

  const handleDelete = async () => {
    if (type === "venue") {
      await deleteVenue(id);
    }
    if (type === "booking") {
      await deleteBooking(id);
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  if (isDeleted) {
    return <div>{type} has been successfully deleted.</div>;
  }

  return (
    <div>
      <StyledButton onClick={handleDelete} $variant="secondary">
        Confirm
      </StyledButton>
      <div>{isError}</div>
    </div>
  );
};
