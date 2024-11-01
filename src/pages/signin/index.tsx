import { SignInForm } from "./signinForm";
import { StyledSignIn, StyledFormWrapper } from "./styles";
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
    </StyledSignIn>
  );
};
