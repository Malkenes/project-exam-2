import { StyledButton } from "../../../components/buttons/styles";
import {
  StyledButtonContainer,
  StyledErrorContainer,
  StyledInputContainer,
} from "../../../components/form/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Media as typeMedia } from "../../../shared/types";
import React, { useState } from "react";
import {
  StyledAddedMedia,
  StyledMedia,
  StyledMediaExtended,
} from "./media.styles";

const schema = yup
  .object({
    url: yup.string().url().required(),
    alt: yup.string().max(120, "to long"),
  })
  .required();

interface Props {
  onSubmit: (data: { media: typeMedia[] }) => void;
  onBack?: () => void;
  defaultValues?: { media?: typeMedia[] };
}

export const Media: React.FC<Props> = ({ onSubmit, onBack, defaultValues }) => {
  const [mediaList, setMediaList] = useState<typeMedia[]>(
    defaultValues?.media || [],
  );
  const [mediaState, setMediaState] = useState<typeMedia>({ url: "", alt: "" });
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = () => {
    if (mediaState.url) {
      setMediaList([...mediaList, mediaState]);
      setMediaState({ url: "", alt: "" });
    }
  };

  const handleRemoveMedia = (index: number) => {
    const updatedList = mediaList.filter((_, i) => i !== index);
    setMediaList(updatedList);
    setSelectedMediaIndex(null);
  };

  const handleContinue = () => {
    onSubmit({ media: mediaList });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Link to images (optional)</h2>
      <StyledMedia>
        <StyledMediaExtended>
          <img src={mediaState.url} alt={mediaState.alt} />
          <StyledButton $variant="secondary" type="submit">
            Add
          </StyledButton>
          <AddMedia
            media={mediaList}
            onSelect={(index) =>
              setSelectedMediaIndex(index === selectedMediaIndex ? null : index)
            }
            selectedIndex={selectedMediaIndex}
            onRemove={handleRemoveMedia}
          />
        </StyledMediaExtended>
        <div>
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
            <StyledButton
              type="button"
              onClick={handleContinue}
              $variant="primary"
            >
              Continue
            </StyledButton>
            <StyledButton type="button" onClick={onBack} $variant="secondary">
              Back
            </StyledButton>
          </StyledButtonContainer>
        </div>
      </StyledMedia>
    </form>
  );
};

interface AddMediaProps {
  media: typeMedia[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onRemove: (index: number) => void;
}

const AddMedia: React.FC<AddMediaProps> = ({
  media,
  selectedIndex,
  onSelect,
  onRemove,
}) => {
  return (
    <StyledAddedMedia>
      {media?.map((el, index) => (
        <div key={index}>
          <img src={el.url} alt={el.alt} onClick={() => onSelect(index)} />
          {selectedIndex === index && (
            <button onClick={() => onRemove(index)}>remove</button>
          )}
        </div>
      ))}
    </StyledAddedMedia>
  );
};
