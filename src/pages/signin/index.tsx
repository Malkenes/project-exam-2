import { SignInForm } from "./signinForm";
import { StyledSignIn, StyledFormWrapper, StyledHelpWrapper } from "./styles";
import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";

export const SignIn: React.FC = () => {
  const userRole = useUserStore((state) => state.userRole);
  if (userRole !== "guest") {
    return (
      <div>
        <h1>You are already signed in</h1>
        <Link to={"/"}>return to home</Link>
      </div>
    );
  }
  return (
    <StyledSignIn>
      <hgroup>
        <h1>Sign In</h1>
        <p>
          Your adventure awaits! Sign in to find the perfect place to rest and
          recharge.
        </p>
      </hgroup>
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
