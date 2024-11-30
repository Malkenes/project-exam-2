import { StyledLink } from "../../components/buttons/styles";
import { SearchBarContainer } from "../../components/form/search";
import {
  VenueList,
  VenueListContinent,
  VenueListPopular,
} from "../../components/venue/list";
import { getThreeContinents } from "../../utils";
import { StyledHomePage, StyledInfoCard } from "./styles";

export const Home: React.FC = () => {
  return (
    <main>
      <SearchBarContainer />
      <div>
        <HomePageContent />
      </div>
    </main>
  );
};

const HomePageContent: React.FC = () => {
  const continentList = getThreeContinents();
  return (
    <StyledHomePage>
      <div>
        <h2>Newly Added to Holidaze</h2>
        <VenueList url="holidaze/venues?sort=created" />
      </div>
      <div>
        <VenueListContinent continent={continentList[0]} />
      </div>
      <div>
        <StyledInfoCard>
          <div>
            <h2>Become a Venue Manager</h2>
            <p>
              Own a property? Start earning by listing your accommodation with
              us!
            </p>
            <p>
              Join our community of trusted hosts and reach thousands of
              travelers worldwide.
            </p>
          </div>
          <div>
            <h3>Why List with Us?</h3>
            <p>
              Easy Setup: Create and manage your listing with our simple tools.
            </p>
            <p>
              Global Exposure: Get your property in front of a global audience.
            </p>
            <p>
              Full Control: Set your own pricing, availability, and house rules.
            </p>
          </div>
          <div>
            <h3>Start Hosting Today!</h3>
            <p>
              Unlock new opportunities and turn your space into a successful
              business.
            </p>
            <StyledLink to={"/list_venue"} $variant="primary">
              list your property
            </StyledLink>
          </div>
        </StyledInfoCard>
      </div>
      <div>
        <VenueListContinent continent={continentList[1]} />
      </div>
      <div>
        <h2>Popular Venues</h2>
        <VenueListPopular />
      </div>
      <div>
        <VenueListContinent continent={continentList[2]} />
      </div>
    </StyledHomePage>
  );
};
