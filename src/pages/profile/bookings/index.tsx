import { formatDate } from "../../../utils";
import { FaRegEdit, FaRegCalendar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Booking } from "../../../shared/types";
import { isExpired } from "../../../utils";
import * as S from "./styles";

interface Props {
  bookings: Booking[];
}

export const ProfileBookings: React.FC<Props> = ({ bookings }) => {
  return (
    <div>
      <h2>Your Bookings</h2>
      {!bookings ? (
        <div>No Bookings</div>
      ) : (
        <div>
          <h3>Upcomming</h3>
          <S.StyledGrid>
            {bookings
              ?.filter((booking) => !isExpired(booking.dateFrom))
              .sort(
                (a, b) =>
                  new Date(a.dateFrom).getTime() -
                  new Date(b.dateFrom).getTime(),
              )
              .slice(0, 5)
              .map((booking) => (
                <li key={booking.id}>
                  <BookingComponent booking={booking} />
                </li>
              ))}
          </S.StyledGrid>
          <h3>Expired</h3>
          <S.StyledGrid>
            {bookings
              ?.filter((booking) => isExpired(booking.dateTo))
              .sort(
                (a, b) =>
                  new Date(b.dateFrom).getTime() -
                  new Date(a.dateFrom).getTime(),
              )
              .slice(0, 5)
              .map((booking) => (
                <li key={booking.id}>
                  <BookingComponent booking={booking} expired={true} />
                </li>
              ))}
          </S.StyledGrid>
        </div>
      )}
    </div>
  );
};

const BookingComponent: React.FC<{ booking: Booking; expired?: boolean }> = ({
  booking,
  expired,
}) => {
  return (
    <S.StyledBooking $expired={expired}>
      {booking.venue.media[0] ? (
        <img
          src={booking.venue.media[0].url}
          alt={booking.venue.media[0].alt}
        />
      ) : (
        <img />
      )}
      <div>
        <Link to={"/venue/" + booking.venue.id}>
          <h3>{booking.venue.name}</h3>
        </Link>
        <span>
          <FaUserGroup />
          <div>Guests:</div>
          {booking.guests}
        </span>
        <Link to={"/edit/booking/" + booking.id}>
          <FaRegEdit />
        </Link>
      </div>
      <S.StyledDate>
        <div>
          from
          <span>
            <FaRegCalendar />
            {formatDate(booking.dateFrom)}
          </span>
        </div>
        <div>
          to
          <span>
            <FaRegCalendar />
            {formatDate(booking.dateTo)}
          </span>
        </div>
      </S.StyledDate>
    </S.StyledBooking>
  );
};
