import { useFetchBooking } from "../../../hooks/useFetch";
import { BookingForm } from "../../venue/form";
import { useRegister } from "../../register/useRegister";
import { bookingInVenue } from "../../../shared/types";

export const EditBooking: React.FC<{ id: string | undefined }> = ({
  id = "",
}) => {
  const { data, isLoading } = useFetchBooking(id);
  if (isLoading) {
    return <div>...loading</div>;
  }
  if (!data) {
    return <div>ka</div>;
  }
  return (
    <div>
      <FormContainer {...data} />
    </div>
  );
};

interface Props {
  id: string;
  guests: number;
  maxGuests: number;
  price: number;
  bookings?: bookingInVenue[];
  defaultDates: [Date, Date];
}
const FormContainer: React.FC<Props> = ({
  id,
  guests,
  maxGuests,
  price,
  bookings,
  defaultDates,
}) => {
  const { updateBooking, isError, isLoading, isSuccessful } = useRegister();
  const bookedDates = bookings?.filter((booking) => booking.id !== id);
  if (isLoading) {
    return <div>...loading</div>;
  }
  if (isSuccessful) {
    return <div>Booking updated</div>;
  }
  return (
    <div>
      <BookingForm
        price={price}
        maxGuests={maxGuests}
        defaultDates={defaultDates}
        bookings={bookedDates}
        venueId={id}
        guests={guests}
        onSubmitAction={(data) => updateBooking(data.venueId, data)}
      />
      <p>{isError}</p>
    </div>
  );
};
