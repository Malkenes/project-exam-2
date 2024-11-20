import { StyledButton } from "../../../components/buttons/styles";
import { FormFieldset } from "../../../components/form/formFieldset";
import {
  StyledButtonContainer,
  StyledErrorContainer,
  StyledInputContainer,
} from "../../../components/form/styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    price: yup.number().required(),
    maxGuests: yup.number().required(),
    rating: yup.number().required(),
  })
  .required();

interface Props {
  onSubmit: (data: {
    price: number;
    maxGuests: number;
    rating: number;
  }) => void;
  onBack?: () => void;
  defaultValues?: { price: number; maxGuests: number; rating: number };
}

export const Pricing: React.FC<Props> = ({
  onSubmit,
  onBack,
  defaultValues,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: {
    price: number;
    maxGuests: number;
    rating: number;
  }) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Pricing and guests</h2>
      <p>
        Provide clear details about your venue's pricing, capacity, and rating
        to help potential guests find the best fit for their needs.
      </p>
      <StyledErrorContainer>
        <StyledInputContainer>
          <input
            type="text"
            placeholder="Price"
            id="price"
            {...register("price")}
          />
          <label htmlFor="price">Price</label>
        </StyledInputContainer>
        <p>{errors.price?.message}</p>
      </StyledErrorContainer>
      <Controller
        name="maxGuests"
        control={control}
        defaultValue={1}
        render={({ field: { onChange, value } }) => (
          <FormFieldset
            name="Max Guests"
            max={10}
            selectedValue={value}
            onChange={(value) => {
              onChange(value);
            }}
          />
        )}
      />
      <Controller
        name="rating"
        control={control}
        defaultValue={1}
        render={({ field: { onChange, value } }) => (
          <FormFieldset
            name="Rating"
            max={5}
            selectedValue={value}
            onChange={(value) => {
              onChange(value);
            }}
          />
        )}
      />
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
