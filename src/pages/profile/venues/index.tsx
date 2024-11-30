import { formatDate } from "../../../utils";
import { FaRegEdit, FaRegCalendar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Venue } from "../../../shared/types";
import { isExpired } from "../../../utils";
import * as S from "./styles";
import { useApi } from "../../../hooks/useApi";
import { Loader } from "../../../components/loaders";
import { StyledLink } from "../../../components/buttons/styles";

interface Props {
  venues: Venue[];
  user: boolean;
}

export const ProfileVenues: React.FC<Props> = ({ venues, user }) => {
  return (
    <div style={{ marginTop: "32px" }}>
      {user && (
        <StyledLink
          $variant="primary"
          to={"/list_venue"}
          style={{ float: "right", textDecoration: "none" }}
        >
          List Venue
        </StyledLink>
      )}
      <h2>Your Venues</h2>
      {!venues ? (
        <div>No Venues</div>
      ) : (
        <div>
          <S.StyledColumn>
            {venues?.map((venue) => (
              <li key={venue.id}>
                <S.StyledVenue>
                  <div>
                    <Link to={"/venue/" + venue.id}>
                      {venue.media[0] ? (
                        <img
                          src={venue.media[0].url}
                          alt={venue.media[0].alt}
                        />
                      ) : (
                        <img />
                      )}
                    </Link>
                    <S.Header>
                      <Link to={"/venue/" + venue.id}>
                        <h3>{venue.name}</h3>
                      </Link>
                      {user && (
                        <Link to={"/edit/venue/" + venue.id}>
                          <FaRegEdit />
                        </Link>
                      )}
                    </S.Header>
                  </div>
                  <S.StyledBookingContainer>
                    {user ? (
                      <BookingsInVenue id={venue.id} />
                    ) : (
                      <div>{venue.description}</div>
                    )}
                  </S.StyledBookingContainer>
                </S.StyledVenue>
              </li>
            ))}
          </S.StyledColumn>
        </div>
      )}
    </div>
  );
};

const BookingsInVenue: React.FC<{ id: string }> = ({ id }) => {
  const { data, error, isLoading } = useApi<Venue>(
    `holidaze/venues/${id}?_bookings=true`,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!data) {
    return <div>something went wrong</div>;
  }

  return (
    <S.BookingList>
      <h4>Upcomming bookings</h4>
      {data.bookings
        ?.filter((booking) => !isExpired(booking.dateFrom))
        .sort(
          (a, b) =>
            new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
        )
        .map((booking, index) => (
          <S.BookingItem
            key={booking.id}
            style={{
              backgroundColor:
                index % 2 === 0 ? "white" : "rgba(139, 139, 223, 0.1)",
            }}
          >
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
          </S.BookingItem>
        ))}
    </S.BookingList>
  );
};
