import {
  StyledInputContainer,
  StyledErrorContainer,
  StyledButtonContainer,
} from "../../../components/form/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../../stores/useUserStore";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StyledButton } from "../../../components/buttons/styles";

const schema = yup
  .object({
    name: yup.string().min(3, "name not name").required(),
    email: yup
      .string()
      .email("Invalid email format")
      .matches(
        /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
        "Email must be a @stud.noroff.no address",
      )
      .required(),
    password: yup.string().min(8, "Password to short").required(),
    bio: yup.string().max(160, "The bio must be less than 160 characters"),
  })
  .required();

export const Personal: React.FC = () => {
  const goToNextStep = useMultiStepStore((state) => state.setNext);
  const updateStore = useUserStore((state) => state.setRegisterState);
  const defaultValues = useUserStore((state) => state.registerData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: {
    name: string;
    email: string;
    password: string;
    bio?: string;
  }) => {
    updateStore(data);
    goToNextStep();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Personal Information</h2>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input
            type="text"
            placeholder="name"
            id="name"
            {...register("name")}
          />
          <label htmlFor="name">Name</label>
        </StyledInputContainer>
        <p>{errors.name?.message}</p>
      </StyledErrorContainer>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input
            type="email"
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
      <StyledErrorContainer>
        <StyledInputContainer>
          <textarea placeholder="bio" id="bio" {...register("bio")} />
          <label htmlFor="bio">Bio</label>
        </StyledInputContainer>
        <p>{errors.bio?.message}</p>
      </StyledErrorContainer>
      <StyledButtonContainer>
        <StyledButton type="submit" variant="primary">
          Continue
        </StyledButton>
      </StyledButtonContainer>
    </form>
  );
};
