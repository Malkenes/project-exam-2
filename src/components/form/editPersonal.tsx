import { useForm } from "react-hook-form";
import { useMultiStepStore } from "../../stores/useMultiStepStore";
import { useUserStore } from "../../stores/useUserStore";
import { StyledButton } from "../buttons/styles";
import {
  StyledErrorContainer,
  StyledInputContainer,
  StyledButtonContainer,
} from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    bio: yup.string().max(160, "The bio must be less than 160 characters"),
  })
  .required();

export const EditPersonal: React.FC = () => {
  const goToNextStep = useMultiStepStore((state) => state.setNext);
  const updateStore = useUserStore((state) => state.setState);
  const defaultValues = useUserStore((state) => state.userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: { bio?: string }) => {
    console.log(data);
    updateStore(data);
    goToNextStep();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Personal Information</h2>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input
            value={defaultValues.name}
            disabled
            type="text"
            placeholder="name"
            id="name"
          />
          <label htmlFor="name">Name</label>
        </StyledInputContainer>
      </StyledErrorContainer>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input
            value={defaultValues.email}
            disabled
            type="email"
            placeholder="email"
            id="email"
          />
          <label htmlFor="email">Email Address</label>
        </StyledInputContainer>
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
