import { SignInForm } from "./signinForm";
import { StyledSignIn, StyledFormWrapper, StyledHelpWrapper } from "./styles";
import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";

export const SignIn: React.FC = () => {
  const userData = useUserStore((state) => state.userData);
  if (userData.accessToken) {
    return (
      <main>
        <h1>You are already signed in</h1>
        <Link to={"/"}>return to home</Link>
      </main>
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
