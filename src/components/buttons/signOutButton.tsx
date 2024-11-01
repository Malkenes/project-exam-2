import { useUserStore } from "../../stores/useUserStore";
import { StyledLink } from "./styles";

export const SignOutButton: React.FC = () => {
  const reset = useUserStore((state) => state.reset);

  return (
    <StyledLink variant="secondary" onClick={() => reset()} to={"/"}>
      Sign Out
    </StyledLink>
  );
};
