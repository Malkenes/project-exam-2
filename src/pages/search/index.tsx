import { SearchBarContainer } from "../../components/form/search";
import { useSearchStore } from "../../stores/useSearchStore";
import { ProductCard } from "../../components/venue";
import { Link } from "react-router-dom";
import { isRangeFullyBooked } from "../../utils/helpers";
import { getFullyBookedDates } from "../../utils";
import { Venue } from "../../shared/types";
import { useApi } from "../../hooks/useApi";

export const Search: React.FC = () => {
  return (
    <main>
      <SearchBarContainer />
      <SearchResults />
    </main>
  );
};

const SearchResults: React.FC = () => {
  const { search } = useSearchStore();
  const apiEndPoint = search.query
    ? `holidaze/venues/search?q=${search.query}&_bookings=true`
    : `holidaze/venues?_bookings=true`;

  const { data, isLoading, error } = useApi<Venue[]>(apiEndPoint);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(data)) {
    return <div>Unexpected data format</div>;
  }
  const filteredVenues =
    data?.filter((venue: Venue) => {
      if (venue.bookings) {
        return (
          !isRangeFullyBooked(
            [search.dateFrom, search.dateTo],
            getFullyBookedDates(venue.maxGuests, venue.bookings),
          ) && venue.maxGuests >= search.guests
        );
      } else {
        return venue.maxGuests >= search.guests;
      }
    }) || [];

  if (filteredVenues.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <ul>
      {filteredVenues.map((venue: Venue) => (
        <li key={venue.id}>
          <Link to={"/venue/" + venue.id}>
            <ProductCard
              name={venue.name}
              price={venue.price}
              media={venue.media}
              location={venue.location}
              meta={venue.meta}
              rating={venue.rating}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
