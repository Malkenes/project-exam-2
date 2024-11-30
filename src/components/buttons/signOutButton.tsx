import { useHolidazeStore } from "../../stores";
import { StyledButton } from "./styles";
import { useNavigate } from "react-router-dom";

export const SignOutButton: React.FC = () => {
  const reset = useHolidazeStore((state) => state.resetUser);
  const navigate = useNavigate();

  return (
    <StyledButton
      $variant="secondary"
      onClick={() => {
        reset();
        navigate("/");
      }}
    >
      Sign Out
    </StyledButton>
  );
};
