import { useNavigate } from "react-router-dom";
import { useRegister } from "../../../pages/register/useRegister";
import { useHolidazeStore } from "../../../stores";
import { Loader } from "../../loaders";
import { StyledFullButton } from "../styles";

export const BookingButton: React.FC = () => {
  const navigate = useNavigate();

  const { createBooking, isError, isLoading, isSuccessful } = useRegister();
  const { booking } = useHolidazeStore();
  const { dateFrom, dateTo, venueId, guests } = booking;

  const handleClick = () => {
    createBooking({ dateFrom, dateTo, venueId, guests });
  };
  if (isError) {
    return <div>{isError}</div>;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (isSuccessful) {
    navigate("/success");
  }
  return (
    <StyledFullButton $variant="primary" onClick={handleClick}>
      Confirm Booking
    </StyledFullButton>
  );
};
