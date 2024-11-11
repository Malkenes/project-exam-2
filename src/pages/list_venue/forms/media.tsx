import { StyledButton } from "../../../components/buttons/styles";
import {
  StyledButtonContainer,
  StyledErrorContainer,
  StyledInputContainer,
} from "../../../components/form/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Media as typeMedia } from "../../../shared/types";
import React, { useState } from "react";
import { useVenueStore } from "../../../stores/useVenueStore";

const schema = yup
  .object({
    url: yup.string().url().required(),
    alt: yup.string().max(120, "to long"),
  })
  .required();

export const Media: React.FC = () => {
  const goToNextStep = useMultiStepStore((state) => state.setNext);
  const goToPrevStep = useMultiStepStore((state) => state.setPrev);
  const [mediaState, setMediaState] = useState<typeMedia>({ url: "", alt: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = () => {
    handleAddMedia();
    console.log(useVenueStore.getState().media);
    setMediaState({ url: "", alt: "" });
  };
  const handleAddMedia = () => {
    useVenueStore.setState((state) => ({
      media: state.media
        ? [...state.media, { url: mediaState.url, alt: mediaState.alt }]
        : [{ url: mediaState.url, alt: mediaState.alt }],
    }));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Link to images (optional)</h2>
      <div>
        <img
          src={mediaState.url}
          alt={mediaState.alt}
          style={{ width: "200px" }}
        />
        <button type="submit">Add</button>
        <AddMedia />
      </div>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input
            value={mediaState.url}
            type="text"
            placeholder="URL"
            id="url"
            onInput={(e) =>
              setMediaState({
                ...mediaState,
                url: (e.target as HTMLInputElement).value,
              })
            }
            {...register("url")}
          />
          <label htmlFor="url">URL</label>
        </StyledInputContainer>
        <p>{errors.url?.message}</p>
      </StyledErrorContainer>
      <StyledErrorContainer>
        <StyledInputContainer>
          <textarea
            value={mediaState.alt}
            placeholder="Description"
            id="alt"
            onInput={(e) =>
              setMediaState({
                ...mediaState,
                alt: (e.target as HTMLInputElement).value,
              })
            }
            {...register("alt")}
          />
          <label htmlFor="alt">Description</label>
        </StyledInputContainer>
        <p>{errors.alt?.message}</p>
      </StyledErrorContainer>
      <StyledButtonContainer>
        <StyledButton type="button" onClick={goToNextStep} $variant="primary">
          Continue
        </StyledButton>
        <StyledButton type="button" onClick={goToPrevStep} $variant="secondary">
          Back
        </StyledButton>
      </StyledButtonContainer>
    </form>
  );
};

const AddMedia: React.FC = () => {
  const { media } = useVenueStore();
  return (
    <div>
      {media?.map((el, index) => (
        <img key={index} src={el.url} alt={el.alt} style={{ width: "50px" }} />
      ))}
    </div>
  );
};
