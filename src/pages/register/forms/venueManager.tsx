import { StyledCheckContainer } from "../../../components/form/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { useRegisterStore } from "../../../stores/useRegisterStore";
import { useForm } from "react-hook-form";
import { useRegister } from "../useRegister";
import { Loader } from "../../../components/loaders";
import { RegisterUser } from "../../../shared/types";

export const VenueManager: React.FC = () => {
  const goToPrevStep = useMultiStepStore((state) => state.setPrev);
  const updateRegisterStore = useRegisterStore((state) => state.setState);
  const defaultValues = useRegisterStore.getState().getValues();
  const { register, handleSubmit } = useForm({
    defaultValues,
  });
  const { reg, isError, isLoading } = useRegister();

  const onSubmit = (data: RegisterUser) => {
    updateRegisterStore(data);
    const datatoApi = useRegisterStore.getState().getRegisterValues();
    reg(datatoApi);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Become a venue manager (Optional)</h2>
      <StyledCheckContainer>
        <input
          type="checkbox"
          id="venuemanager"
          {...register("venueManager")}
        />
        <label htmlFor="venuemanager">I want to be a venue manager</label>
      </StyledCheckContainer>
      <button type="button" onClick={goToPrevStep}>
        Back
      </button>
      <button type="submit">submit</button>
      <p>{isError}</p>
    </form>
  );
};
