import { useParams } from "react-router-dom";
import { useFormStore } from "./../../stores/useMultiStepStore";
import { BookingForm } from "../venue/form";
import { DeleteModal } from "../../components/modals/deleteModal";
import { useModalStore } from "../../stores/useModalStore";
import { useFetchBooking } from "../../hooks/useFetch";
import { EditProfile } from "./profile";
import { useEffect } from "react";

export const Edit: React.FC = () => {
  const reset = useFormStore((state) => state.resetSteps);
  useEffect(() => {
    reset();
  }, [reset]);

  const { type, id } = useParams();
  const renderEditType = () => {
    switch (type) {
      case "profile":
        return <EditProfile />;
      case "venue":
        return <EditVenue id={id} />;
      case "booking":
        return <EditBooking id={id} />;
      default:
        break;
    }
  };
  return (
    <main>
      <DeleteModal title="Want to say Goodbye?" id={id} type={type} />
      <h1>Edit {type}</h1>
      <div>{renderEditType()}</div>
    </main>
  );
};

const EditVenue: React.FC<{ id: string | undefined }> = ({ id }) => {
  const { openModal } = useModalStore();
  console.log(id);

  return (
    <div>
      <button onClick={openModal}>I want to remove my booking</button>
    </div>
  );
};

const EditBooking: React.FC<{ id: string | undefined }> = ({ id = "" }) => {
  const { openModal } = useModalStore();
  const { data, isLoading } = useFetchBooking(id);
  if (isLoading) {
    return <div>...loading</div>;
  }
  if (!data) {
    return <div>ka</div>;
  }
  console.log(data);
  console.log(data.price);
  return (
    <div>
      <BookingForm
        price={data.price}
        maxGuests={data.maxGuests}
        defaultDates={data.defaultDates}
        bookings={data.bookings}
        venueId={data.id}
        onSubmitAction={console.log("cant update")}
      />
      <button onClick={openModal}>I want to remove my booking</button>
    </div>
  );
};
