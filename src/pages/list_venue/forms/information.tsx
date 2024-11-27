import { StyledButton } from "../../../components/buttons/styles";
import {
  StyledButtonContainer,
  StyledErrorContainer,
  StyledInputContainer,
} from "../../../components/form/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  StyledInformation,
  StyledInformationExtended,
} from "./information.styles";

const schema = yup
  .object({
    name: yup.string().min(3, "name not name").required(),
    description: yup
      .string()
      .max(160, "The description must be less than 160 characters")
      .required(),
  })
  .required();

interface Props {
  onSubmit: (data: { name: string; description: string }) => void;
  onBack?: () => void;
  defaultValues?: { name: string; description: string };
}

export const Information: React.FC<Props> = ({
  onSubmit,
  onBack,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = (data: { name: string; description: string }) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Basic Information</h2>
      <StyledInformation>
        <div>
          <p>
            Give your venue a standout name and provide a description that
            captures its unique appeal, setting the right expectations for
            potential guests.
          </p>
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
              <textarea
                placeholder="description"
                id="description"
                {...register("description")}
              />
              <label htmlFor="description">Description</label>
            </StyledInputContainer>
            <p>{errors.description?.message}</p>
          </StyledErrorContainer>
          <StyledButtonContainer>
            <StyledButton type="submit" $variant="primary">
              Continue
            </StyledButton>
            <StyledButton type="button" onClick={onBack} $variant="secondary">
              Back
            </StyledButton>
          </StyledButtonContainer>
        </div>
        <StyledInformationExtended>
          <div>
            <h3>Venue Name</h3>
            <p>
              Choose a name that reflects the character or style of your venue.
              Whether it's a cozy retreat, a modern apartment, or a luxury
              villa, the name should convey the atmosphere you want to present.
              Keep it simple, memorable, and relevant to your venue's unique
              identity.
            </p>
          </div>
          <div>
            <h3>Description</h3>
            <p>
              Write a detailed description that highlights the most important
              features of your venue. Include information about the space,
              location, amenities, and any special details that make it unique.
              Mention things like scenic views, proximity to attractions, or
              whether it's ideal for families, business travelers, or romantic
              getaways. Focus on what sets your venue apart and what guests can
              expect during their stay.
            </p>
          </div>
        </StyledInformationExtended>
      </StyledInformation>
    </form>
  );
};
