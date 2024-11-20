import { Media } from "../../../shared/types";
import {
  StyledInputContainer,
  StyledErrorContainer,
  StyledPreviewBanner,
  StyledButtonContainer,
} from "../../../components/form/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { StyledButton } from "../../../components/buttons/styles";

const schema = yup
  .object({
    url: yup.string().url("Invalid URL"),
    alt: yup.string().max(120, "Description is to long"),
  })
  .required();

interface Props {
  onSubmit: (banner: { banner?: Media }) => void;
  onBack?: () => void;
  defaultValues?: Media;
}

export const Banner: React.FC<Props> = ({
  onSubmit,
  onBack,
  defaultValues = { url: "", alt: "" },
}) => {
  const [bannerUrl, setBannerUrl] = useState(defaultValues.url);
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
      onSubmit({ banner: data });
    } else {
      onSubmit({ banner: undefined });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Banner Information (Optional)</h2>
      <StyledPreviewBanner>
        <img src={bannerUrl} alt="Banner preview" />
      </StyledPreviewBanner>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input
            type="text"
            placeholder="URL"
            id="url"
            onInput={(e) => setBannerUrl((e.target as HTMLInputElement).value)}
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
