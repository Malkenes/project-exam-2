import { Link } from "react-router-dom";
import { StyledUnauthorized } from "./styles";

export const Unauthorized: React.FC = () => {
  return (
    <StyledUnauthorized>
      <h1>Access Denied</h1>
      <p>Please sign in or register to continue.</p>
      <Link to={"/signin"}>Sign in</Link>
      <Link to={"/register"}>Register</Link>
    </StyledUnauthorized>
  );
};
