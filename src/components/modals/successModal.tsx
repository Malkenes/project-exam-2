import { useModalStore } from "../../stores/useModalStore";
import { StyledModalWrapper, StyledModal } from "./styles";
import { Link } from "react-router-dom";
import { StyledButton } from "../buttons/styles";
export const SuccessModal: React.FC = () => {
  const { isModalOpen, closeModal } = useModalStore();
  if (!isModalOpen) return null;

  return (
    <StyledModalWrapper>
      <StyledModal>
        <h2>Success</h2>
        <p>profile updated successfully</p>
        <Link onClick={closeModal} to={"/"}>
          go to homepage
        </Link>
        <StyledButton onClick={closeModal} $variant="secondary">
          I need to do more editing
        </StyledButton>
      </StyledModal>
    </StyledModalWrapper>
  );
};
