import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useProfileStore } from "../../stores/useProfileStore";
import { Link } from "react-router-dom";
import * as S from "./styles";
import { FaUserEdit, FaRegEdit, FaRegCalendar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { formatDate, isExpired } from "../../utils";
import { Booking, Venue } from "../../shared/types";

export const Profile: React.FC = () => {
  const { id } = useParams();
  const { accessToken, isError, isLoading } = useFetch(id);
  if (!accessToken) {
    return (
      <div>
        You need to <Link to={"/signin"}>sign in</Link> to view this page
      </div>
    );
  }
  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) {
    return <div>{isError}</div>;
  }
  return (
    <S.StyledProfilePage>
      <ProfileHero />
      <div style={{ padding: "16px" }}>
        <ProfileBookings />
        <ProfileVenues />
      </div>
    </S.StyledProfilePage>
  );
};

const ProfileHero: React.FC = () => {
  const { name, bio, avatar, banner } = useProfileStore();
  return (
    <S.StyledProfile>
      <S.StyledBanner $backgroundImage={banner.url} />
      <S.StyledUser>
        <div>
          <Link to={"/edit/profile"}>
            <FaUserEdit size={24} />
          </Link>
          <img src={avatar.url} alt={avatar.alt} />
        </div>
        <h1>{name}</h1>
      </S.StyledUser>
      <p>{bio}</p>
    </S.StyledProfile>
  );
};

const ProfileBookings: React.FC = () => {
  const { bookings } = useProfileStore();

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

const ProfileVenues: React.FC = () => {
  const { venues } = useProfileStore();
  return (
    <div>
      <h2>Your Venues</h2>
      <Link to={"/list_venue"}>List Venue</Link>
      {!venues ? (
        <div>No Venues</div>
      ) : (
        <div>
          <S.StyledColumn>
            {venues?.map((venue) => (
              <li key={venue.id}>
                <S.StyledVenue>
                  <Link to={"/venue/" + venue.id}>
                    {venue.media[0] ? (
                      <img src={venue.media[0].url} alt={venue.media[0].alt} />
                    ) : (
                      <img />
                    )}
                    <S.StyledDate>
                      <h3>{venue.name}</h3>
                      <Link to={"/edit/venue" + venue.id}>
                        <FaRegEdit />
                      </Link>
                    </S.StyledDate>
                  </Link>
                  <BookingsInVenue bookings={venue.bookings} />
                </S.StyledVenue>
              </li>
            ))}
          </S.StyledColumn>
        </div>
      )}
    </div>
  );
};

const BookingsInVenue: React.FC<Partial<Venue>> = ({ bookings }) => {
  return (
    <ul style={{ padding: "0" }}>
      <h4>Upcomming bookings</h4>
      {bookings
        ?.filter((booking) => !isExpired(booking.dateFrom))
        .sort(
          (a, b) =>
            new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
        )
        .map((booking) => (
          <li key={booking.id}>
            <div>
              <S.StyledDate>
                <p>
                  Name:{" "}
                  <Link to={`/profile/${booking.customer.name}`}>
                    {booking.customer.name}
                  </Link>
                </p>
                <span>
                  <FaUserGroup />
                  <div>Guests:</div>
                  {booking.guests}
                </span>
              </S.StyledDate>
              <S.StyledDate>
                <p>Email: {booking.customer.email}</p>
              </S.StyledDate>
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
            </div>
          </li>
        ))}
    </ul>
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
        <h3>{booking.venue.name}</h3>
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
