import { SignInForm } from "./signinForm";
import {
  StyledSignIn,
  StyledFormWrapper,
  StyledHelpWrapper,
  StyledTitleWrapper,
} from "./styles";
import { Link } from "react-router-dom";

export const SignIn: React.FC = () => {
  return (
    <StyledSignIn>
      <StyledTitleWrapper>
        <hgroup>
          <h1>Sign In</h1>
          <p>
            Your adventure awaits! Sign in to find the perfect place to rest and
            recharge.
          </p>
        </hgroup>
      </StyledTitleWrapper>
      <StyledFormWrapper>
        <SignInForm />
      </StyledFormWrapper>
      <StyledHelpWrapper>
        <h2>Forgot your password?</h2>
        <Link to={"/signin"}>We'll help you get back on track!</Link>
        <h2>New to us?</h2>
        <Link to={"/register"}>Join now for personalized recommendations</Link>
      </StyledHelpWrapper>
    </StyledSignIn>
  );
};
