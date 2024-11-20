import { Avatar as TypeAvatar } from "../../../shared/types";
import {
  StyledInputContainer,
  StyledErrorContainer,
  StyledPreviewAvatar,
  StyledButtonContainer,
} from "../../../components/form/styles";
import { StyledButton } from "../../../components/buttons/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup
  .object({
    url: yup.string().url("Invalid URL"),
    alt: yup.string().max(120, "Description is to long"),
  })
  .required();

interface Props {
  onSubmit: (avatar: { avatar?: TypeAvatar }) => void;
  onBack?: () => void;
  defaultValues?: TypeAvatar;
}
export const Avatar: React.FC<Props> = ({
  onSubmit,
  onBack,
  defaultValues = { url: "", alt: "" },
}) => {
  const [avatarUrl, setAvatarUrl] = useState(defaultValues.url);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: { url?: string; alt?: string }) => {
    if (data.url) {
      onSubmit({ avatar: data });
    } else {
      onSubmit({ avatar: undefined });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
        <StyledButton type="submit" $variant="primary">
          Continue
        </StyledButton>
        <StyledButton type="button" onClick={onBack} $variant="secondary">
          Back
        </StyledButton>
      </StyledButtonContainer>
    </form>
  );
};
