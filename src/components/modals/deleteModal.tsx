import { useModalStore } from "../../stores/useModalStore";
import { StyledModalWrapper, StyledModal } from "./styles";
import { Link } from "react-router-dom";
import { StyledButton } from "../buttons/styles";
import { useRegister } from "../../pages/register/useRegister";

interface Props {
  title: string;
  type: string;
  id: string;
}
export const DeleteModal: React.FC<Props> = ({ title, id, type }) => {
  const { isModalOpen, closeModal } = useModalStore();
  const { deleteBooking } = useRegister();

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
        <Link onClick={closeModal} to={"/"}>
          Take me home
        </Link>
        <StyledButton onClick={() => deleteBooking(id)} $variant="secondary">
          Confirm
        </StyledButton>
      </StyledModal>
    </StyledModalWrapper>
  );
};
