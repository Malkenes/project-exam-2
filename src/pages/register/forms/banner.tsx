import { Banner as typeBanner } from "../../../shared/types";
import {
  StyledInputContainer,
  StyledErrorContainer,
  StyledPreviewBanner,
  StyledButtonContainer,
} from "../../../components/form/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { useForm } from "react-hook-form";
import { useRegisterStore } from "../../../stores/useRegisterStore";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { StyledButton } from "../../../components/buttons/styles";

const schema = yup
  .object({
    url: yup.string().url().nullable(),
    alt: yup.string().max(120, "to long"),
  })
  .required();

export const Banner: React.FC = () => {
  const goToPrevStep = useMultiStepStore((state) => state.setPrev);
  const goToNextStep = useMultiStepStore((state) => state.setNext);
  const updateRegisterStore = useRegisterStore((state) => state.setBannerState);
  const defaultValues = useRegisterStore.getState().getValues().banner;
  const [bannerUrl, setBannerUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit = (banner: typeBanner) => {
    updateRegisterStore(banner);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
