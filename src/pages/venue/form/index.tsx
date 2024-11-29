import { BookingCalendar } from "../../../components/form/calendar";
import { FormFieldset } from "../../../components/form/formFieldset";
import { bookingInVenue } from "../../../shared/types";
import {
  StyledBookingForm,
  StyledBookingInfo,
  StyledPriceContainer,
} from "./styles";
import { getFullyBookedDates } from "../../../utils";
import { useHolidazeStore } from "../../../stores";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { isRangeFullyBooked, getRangeDates } from "../../../utils/helpers";
import { StyledButton } from "../../../components/buttons/styles";
import { useNavigate } from "react-router-dom";

type BookingData = {
  dateFrom: Date;
  dateTo: Date;
  guests: number;
  venueId: string;
};

interface Props {
  venueId: string;
  venueName?: string;
  maxGuests: number;
  price: number;
  bookings?: bookingInVenue[];
  defaultDates?: Value;
  guests?: number;
  onSubmitAction: (data: BookingData) => void;
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
  const { booking, setBookingState } = useHolidazeStore();
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
                setBookingState({ guests: value });
              }}
            />
          )}
        />
        <StyledPriceContainer>
          <h3>Price</h3>
          <p>{price * booking.guests} Bitcoin</p>
          <span>per day</span>
        </StyledPriceContainer>
        <div>
          <StyledButton $variant="primary" type="submit">
            Book Now
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
  name: string;
  maxGuests: number;
  price: number;
  bookings?: bookingInVenue[];
}

export const FormContainer: React.FC<Xprops> = ({
  bookings,
  maxGuests,
  price,
  venueId,
  name,
}) => {
  const navigate = useNavigate();

  const { setBookingState, booking } = useHolidazeStore();
  console.log(booking);
  console.log(name);
  return (
    <>
      <BookingForm
        bookings={bookings}
        maxGuests={maxGuests}
        price={price}
        venueId={venueId}
        onSubmitAction={(data) => {
          setBookingState(data);
          setBookingState({ name: name });
          navigate("/confirmation");
        }}
      />
    </>
  );
};
