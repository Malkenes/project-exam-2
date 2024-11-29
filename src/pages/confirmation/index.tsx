import { BookingButton } from "../../components/buttons/booking";
import { useHolidazeStore } from "../../stores";
import { Unauthorized } from "../../components/unauthorized";
import { StyledLockedInputContainer } from "../../components/form/styles";
import { StyledConfirmContainer, StyledSummary } from "./styles";

export const Confirmation: React.FC = () => {
  const { userData } = useHolidazeStore();

  if (!userData.accessToken) {
    return <Unauthorized />;
  }

  return (
    <main>
      <hgroup>
        <h1>Booking Confirmation</h1>
        <p>
          Your booking is almost complete! Please review the details below
          before finalizing your reservation.
        </p>
      </hgroup>
      <div>
        <Summary />
      </div>
      <StyledConfirmContainer>
        <h2>Secure Your Reservation</h2>
        <p>
          By clicking 'Confirm Booking' you agree to our Terms & Conditions and
          Cancellation Policy.
        </p>
        <BookingButton />
      </StyledConfirmContainer>
    </main>
  );
};

const Summary: React.FC = () => {
  const { booking, userData } = useHolidazeStore();
  return (
    <StyledSummary>
      <h2>Summary</h2>
      <StyledLockedInputContainer>
        <label htmlFor="guestName">Guest Name</label>
        <input disabled type="text" id="guestName" value={userData.name} />
      </StyledLockedInputContainer>
      <StyledLockedInputContainer>
        <label htmlFor="venueName">Venue</label>
        <input disabled type="text" id="venueName" value={booking.name} />
      </StyledLockedInputContainer>
      <StyledLockedInputContainer>
        <label htmlFor="dateFrom">Check-in Date</label>
        <input
          disabled
          type="text"
          id="dateFrom"
          value={booking.dateFrom.toDateString()}
        />
      </StyledLockedInputContainer>
      <StyledLockedInputContainer>
        <label htmlFor="dateTo">Check-out Date</label>
        <input
          disabled
          type="text"
          id="dateTo"
          value={booking.dateTo.toDateString()}
        />
      </StyledLockedInputContainer>
      <StyledLockedInputContainer>
        <label htmlFor="price">Total Price</label>
        <input disabled type="text" id="price" value={booking.name} />
      </StyledLockedInputContainer>
    </StyledSummary>
  );
};
