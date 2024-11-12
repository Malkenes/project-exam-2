import { StyledFieldSet, StyledFieldSetOption } from "./styles";

interface Props {
  name: string;
  max: number;
  selectedValue: number;
  onChange: (value: number) => void;
}

export const FormFieldset: React.FC<Props> = ({
  name,
  max,
  selectedValue,
  onChange,
}) => {
  const options = Array.from({ length: max }, (_, index) => index + 1);
  return (
    <StyledFieldSet>
      <legend>{name}</legend>
      <div>
        {options.map((option) => (
          <StyledFieldSetOption
            $checked={selectedValue === option}
            key={option}
          >
            <input
              type="radio"
              id={name + option}
              name={name}
              value={option}
              checked={selectedValue === option}
              onChange={() => onChange(option)}
            />
            <label htmlFor={name + option}>{option}</label>
          </StyledFieldSetOption>
        ))}
      </div>
    </StyledFieldSet>
  );
};
