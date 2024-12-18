import {
  StyledInputContainer,
  StyledCheckContainer,
  StyledErrorContainer,
  StyledFormError,
} from "../../components/form/styles";
import { StyledFullButton } from "../../components/buttons/styles";
import { useSignIn } from "./useSignIn";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader } from "../../components/loaders";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .matches(
        /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
        "Email must be a @stud.noroff.no address",
      )
      .required(),
    password: yup.string().min(8, "Password to short").required(),
    keepSignedIn: yup.boolean().required(),
  })
  .required();

export const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { signIn, isError, isLoading, isSuccessful } = useSignIn();
  const navigate = useNavigate();
  async function onSubmit(data: {
    email: string;
    password: string;
    keepSignedIn: boolean;
  }) {
    await signIn(data);
  }
  if (isLoading) {
    return <Loader />;
  }
  if (isSuccessful) {
    navigate("/profile");
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input
            type="text"
            placeholder="email"
            id="email"
            {...register("email")}
          />
          <label htmlFor="email">Email Address</label>
        </StyledInputContainer>
        <p>{errors.email?.message}</p>
      </StyledErrorContainer>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input
            type="password"
            placeholder="password"
            id="password"
            {...register("password")}
          />
          <label htmlFor="password">Password</label>
        </StyledInputContainer>
        <p>{errors.password?.message}</p>
      </StyledErrorContainer>
      <StyledCheckContainer>
        <input type="checkbox" id="keep" {...register("keepSignedIn")} />
        <label htmlFor="keep">Keep me signed in</label>
      </StyledCheckContainer>
      <StyledFullButton $variant="primary">Sign In</StyledFullButton>
      <StyledFormError>{isError}</StyledFormError>
    </form>
  );
};
