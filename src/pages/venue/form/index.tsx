import { BookingCalendar } from "../../../components/form/calendar";
import { FormFieldset } from "../../../components/form/formFieldset";
import { bookingInVenue } from "../../../shared/types";
import { StyledBookingForm, StyledBookingInfo } from "./styles";
import { getFullyBookedDates } from "../../../utils";
import { useBoundStore } from "../../../stores/useVenueStore";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { isRangeFullyBooked, getRangeDates } from "../../../utils/helpers";
import { useRegister } from "../../register/useRegister";
import { StyledFormError } from "../../../components/form/styles";
import { Loader } from "../../../components/loaders";
import { StyledButton } from "../../../components/buttons/styles";

type BookingData = {
  dateFrom: Date;
  dateTo: Date;
  guests: number;
  venueId: string;
};

interface Props {
  venueId: string;
  maxGuests: number;
  price: number;
  bookings?: bookingInVenue[];
  defaultDates?: Value;
  guests?: number;
  onSubmitAction: (data: BookingData) => Promise<void>;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const BookingForm: React.FC<Props> = ({
  bookings,
  maxGuests,
  price,
  venueId,
  defaultDates = [null, null],
  guests = 1,
  onSubmitAction,
}) => {
  const { booking, setGuests } = useBoundStore();
  const { control, handleSubmit } =
    useForm<
      Pick<{ bookingDates: Value; guests: number }, "bookingDates" | "guests">
    >();

  const handleDateChange =
    (onChange: (value: Value) => void) => (nextValue: Value) => {
      if (Array.isArray(nextValue) && nextValue[0] && nextValue[1]) {
        const selectedRange = getRangeDates(nextValue[0], nextValue[1]);

        if (isRangeFullyBooked(selectedRange, fullyBooked)) {
          //alert("The selected range includes fully booked dates. Please choose another range.");
          onChange([null, null]);
        } else {
          onChange(nextValue);
        }
      } else {
        onChange(nextValue);
      }
    };

  const fullyBooked = getFullyBookedDates(
    maxGuests - booking.guests,
    bookings || [],
  );

  const onSubmit: SubmitHandler<
    Pick<{ bookingDates: Value; guests: number }, "bookingDates" | "guests">
  > = (data) => {
    if (Array.isArray(data.bookingDates)) {
      if (data.bookingDates[0] && data.bookingDates[1]) {
        submitBooking(
          {
            dateFrom: data.bookingDates[0],
            dateTo: data.bookingDates[1],
            guests: data.guests,
            venueId,
          },
          onSubmitAction,
        );
      }
    }
  };

  return (
    <StyledBookingForm onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="bookingDates"
        control={control}
        defaultValue={defaultDates}
        render={({ field: { onChange, value } }) => (
          <BookingCalendar
            full={fullyBooked}
            onChange={handleDateChange(onChange)}
            value={value}
          />
        )}
      />

      <StyledBookingInfo>
        <Controller
          name="guests"
          control={control}
          defaultValue={guests}
          render={({ field: { onChange, value } }) => (
            <FormFieldset
              name="Guests"
              max={maxGuests}
              selectedValue={value}
              onChange={(value) => {
                onChange(value);
                setGuests(value);
              }}
            />
          )}
        />
        <div>
          <h3>Total price</h3>
          <p>{price * booking.guests}</p>
        </div>
        <div>
          <StyledButton $variant="primary" type="submit">
            submit
          </StyledButton>
        </div>
      </StyledBookingInfo>
    </StyledBookingForm>
  );
};

const submitBooking = (
  data: BookingData,
  action: (data: BookingData) => void,
) => {
  action(data);
};

interface Xprops {
  venueId: string;
  maxGuests: number;
  price: number;
  bookings?: bookingInVenue[];
}

export const FormContainer: React.FC<Xprops> = ({
  bookings,
  maxGuests,
  price,
  venueId,
}) => {
  const { createBooking, isError, isLoading } = useRegister();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BookingForm
        bookings={bookings}
        maxGuests={maxGuests}
        price={price}
        venueId={venueId}
        onSubmitAction={createBooking}
      />

      <StyledFormError>{isError}</StyledFormError>
    </>
  );
};
