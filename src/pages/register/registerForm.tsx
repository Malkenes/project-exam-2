import {
  StyledInputContainer,
  StyledCheckContainer,
  StyledErrorContainer,
  StyledProgressContainer,
  StyledProgressBar,
} from "../../components/form/styles";
import { useMultiStepStore } from "../../stores/useMultiStepStore";
import { useForm } from "react-hook-form";
import { useRegisterStore } from "../../stores/useRegisterStore";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const MultiSteps: React.FC = () => {
  const step = useMultiStepStore((state) => state.step);
  const totalSteps: number = 4;
  const renderSteps = () => {
    switch (step) {
      case 3:
        return <Personal />;
      case 2:
        return <VenueManager />;
      case 1:
        return <Avatar />;
      case 4:
        return <VenueManager />;
      default:
        break;
    }
  };
  return (
    <div>
      <StyledProgressContainer>
        <StyledProgressBar $percent={step / totalSteps} />
      </StyledProgressContainer>
      {renderSteps()}
    </div>
  );
};

const schema = yup
  .object({
    name: yup.string().min(3, "name not name").required(),
  })
  .required();

const Personal: React.FC = () => {
  const prev = useMultiStepStore((state) => state.setPrev);
  const next = useMultiStepStore((state) => state.setNext);
  const updateRegisterStore = useRegisterStore((state) => state.setState);
  const defaultValues = useRegisterStore.getState().getValues();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  function onSubmit(data: { name: string }) {
    updateRegisterStore(data);
    next();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Personal Information</h2>
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
      <button type="submit">next</button>
      <button type="button" onClick={prev}>
        prev
      </button>
    </form>
  );
};
const Avatar: React.FC = () => {
  const prev = useMultiStepStore((state) => state.setPrev);
  const next = useMultiStepStore((state) => state.setNext);
  return (
    <form action="">
      <h2>Avatar</h2>
      <button onClick={next}>next</button>
      <button onClick={prev}>prev</button>
    </form>
  );
};
const VenueManager: React.FC = () => {
  const prev = useMultiStepStore((state) => state.setPrev);
  const next = useMultiStepStore((state) => state.setNext);
  return (
    <form action="">
      <h2>Become a venue manager (Optional)</h2>
      <StyledCheckContainer>
        <input type="checkbox" id="venuemanager" />
        <label htmlFor="venuemanager">Keep me signed in</label>
      </StyledCheckContainer>
      <button onClick={next}>next</button>
      <button onClick={prev}>prev</button>
    </form>
  );
};
