import { Banner as typeBanner } from "../../../shared/types";
import {
  StyledInputContainer,
  StyledErrorContainer,
} from "../../../components/form/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { useForm } from "react-hook-form";
import { useRegisterStore } from "../../../stores/useRegisterStore";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
      <h2>Banner</h2>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input type="text" placeholder="URL" id="url" {...register("url")} />
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
      <button type="button" onClick={goToPrevStep}>
        Back
      </button>
      <button type="submit">Continue</button>
    </form>
  );
};
