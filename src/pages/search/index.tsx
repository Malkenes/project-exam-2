import { SearchBarContainer } from "../../components/form/search";
import { useHolidazeStore } from "../../stores";
import { ProductCard } from "../../components/venue";
import { Link } from "react-router-dom";
import { isRangeFullyBooked } from "../../utils/helpers";
import { getFullyBookedDates } from "../../utils";
import { Venue } from "../../shared/types";
import { useApi } from "../../hooks/useApi";
import { Loader } from "../../components/loaders";


export const Search: React.FC = () => {
  return (
    <main>
      <SearchBarContainer />
      <SearchResults />
    </main>
  );
};

const SearchResults: React.FC = () => {
  const { search } = useHolidazeStore();
  const apiEndPoint = search.query
    ? `holidaze/venues/search?q=${search.query}&_bookings=true`
    : `holidaze/venues?_bookings=true`;

  const { data, isLoading, error } = useApi<Venue[]>(apiEndPoint);

  if (isLoading) return <Loader />;
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
    <div>
      <h1>Search results for: {search.query}</h1>
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
    </div>
  );
};
