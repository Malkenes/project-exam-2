import { Avatar as typeAvatar } from "../../../shared/types";
import {
  StyledInputContainer,
  StyledErrorContainer,
  StyledPreviewAvatar,
  StyledButtonContainer,
} from "../../../components/form/styles";
import { StyledButton } from "../../../components/buttons/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../../stores/useUserStore";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup
  .object({
    url: yup.string().url(),
    alt: yup.string().max(120, "to long"),
  })
  .required();

export const Avatar: React.FC = () => {
  const goToPrevStep = useMultiStepStore((state) => state.setPrev);
  const goToNextStep = useMultiStepStore((state) => state.setNext);
  const updateStore = useUserStore((state) => state.setAvatarState);
  const defaultValues = useUserStore((state) => state.userData.avatar);
  const [avatarUrl, setAvatarUrl] = useState(defaultValues.url);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit = (avatar: typeAvatar) => {
    updateStore(avatar);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Avatar Information (Optional)</h2>
      <StyledPreviewAvatar>
        <img src={avatarUrl} alt="Avatar preview" />
      </StyledPreviewAvatar>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input
            type="text"
            placeholder="URL"
            id="url"
            onInput={(e) => setAvatarUrl((e.target as HTMLInputElement).value)}
            {...register("url")}
          />
          <label htmlFor="url">URL</label>
        </StyledInputContainer>
        <p>{errors.url?.message}</p>
      </StyledErrorContainer>
      <StyledErrorContainer>
        <StyledInputContainer>
          <textarea placeholder="Description" id="alt" {...register("alt")} />
          <label htmlFor="alt">Description</label>
        </StyledInputContainer>
        <p>{errors.alt?.message}</p>
      </StyledErrorContainer>
      <StyledButtonContainer>
        <StyledButton type="submit" variant="primary">
          Continue
        </StyledButton>
        <StyledButton type="button" onClick={goToPrevStep} variant="secondary">
          Back
        </StyledButton>
      </StyledButtonContainer>
    </form>
  );
};
