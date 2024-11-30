import { Link } from "react-router-dom";
import { Venue } from "../../../shared/types";
import { ProductCard } from "..";
import {
  StyledContinentImage,
  StyledListContainer,
  StyledVenueList,
} from "./styles";
import React, { useEffect, useState } from "react";
import { getAllVenues } from "../../../api/venues";
import { useApi } from "../../../hooks/useApi";
import { Loader } from "../../loaders";
import { StyledErrorContainer } from "../../form/styles";

interface Props {
  url: string;
}

export const VenueList: React.FC<Props> = ({ url }) => {
  const { data, isLoading, error } = useApi<Venue[]>(url + "&limit=6");
  if (isLoading) return <Loader />;
  if (error) return <StyledErrorContainer>{error}</StyledErrorContainer>;
  if (!Array.isArray(data)) return <div>No Venues</div>;
  return (
    <StyledVenueList>
      {data?.map((venue: Venue) => (
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
    </StyledVenueList>
  );
};

export const VenueListPopular: React.FC = () => {
  const { data, isLoading, isError } = useFetchVenues();
  if (Array.isArray(data)) {
    data.sort((a, b) => (b._count.bookings || 0) - (a._count.bookings || 0));
  }
  if (!Array.isArray(data)) return <div>No Venues</div>;
  if (isLoading) return <Loader />;
  if (isError) return <StyledErrorContainer>{isError}</StyledErrorContainer>;
  return (
    <StyledVenueList>
      {data?.slice(0, 6).map((venue: Venue) => (
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
    </StyledVenueList>
  );
};
interface ContinentProps {
  continent: {
    name: string;
    title: string;
    image: string;
  };
}
export const VenueListContinent: React.FC<ContinentProps> = ({ continent }) => {
  const { data, isLoading, isError } = useFetchVenues();
  if (!Array.isArray(data)) return <div>No Venues</div>;
  if (isLoading) return <Loader />;
  if (isError) return <StyledErrorContainer>{isError}</StyledErrorContainer>;
  return (
    <div>
      <StyledContinentImage $img={continent.image}></StyledContinentImage>
      <h2>{continent.title}</h2>
      <StyledListContainer>
        <StyledVenueList>
          {data
            ?.filter((venue) => venue.location.continent === continent.name)
            .slice(0, 6)
            .map((venue: Venue) => (
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
        </StyledVenueList>
      </StyledListContainer>
    </div>
  );
};

const useFetchVenues = () => {
  const [data, setData] = useState<Venue[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllVenues();
        setData(response);
      } catch (error) {
        if (error instanceof Error) {
          setIsError(error.message);
        } else {
          setIsError("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};
