import { useUserStore } from "../../stores/useUserStore";
import { StyledButton } from "./styles";
import { useNavigate } from "react-router-dom";

export const SignOutButton: React.FC = () => {
  const reset = useUserStore((state) => state.reset);
  const navigate = useNavigate();

  return (
    <StyledButton
      variant="secondary"
      onClick={() => {
        reset();
        navigate("/");
      }}
    >
      Sign Out
    </StyledButton>
  );
};
