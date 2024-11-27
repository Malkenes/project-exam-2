import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as S from "./styles";
import { Booking, Media, Venue } from "../../shared/types";
import { Loader } from "../../components/loaders";
import { useUserStore } from "../../stores/useUserStore";
import { useApi } from "../../hooks/useApi";
import { ProfileHero } from "./hero";
import { ProfileBookings } from "./bookings";
import { ProfileVenues } from "./venues";

interface User {
  name: string;
  email: string;
  avatar: Media;
  banner: Media;
  venueManager: boolean;
  bio: string;
  _count: {
    bookings: number;
    venues: number;
  };
  venues?: Venue[];
  bookings?: Booking[];
}

export const Profile: React.FC = () => {
  const { id } = useParams();
  return (
    <S.StyledProfilePage>
      <ProfileType id={id} />
    </S.StyledProfilePage>
  );
};

const ProfileType: React.FC<{ id: string | undefined }> = ({ id }) => {
  const { userData } = useUserStore();

  const profileName = id
    ? `holidaze/profiles/${id}?_venues=true`
    : `holidaze/profiles/${userData.name}?_bookings=true&_venues=true`;
  const { data, error, isLoading } = useApi<User>(
    profileName,
    userData.accessToken,
  );
  if (!userData.accessToken) {
    return (
      <div>
        You need to <Link to={"/signin"}>sign in</Link> to view this page
      </div>
    );
  }
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!data) {
    return <div>something went wrong</div>;
  }
  const user = id === undefined;
  return (
    <div>
      <ProfileHero
        name={data.name}
        bio={data.bio}
        avatar={data.avatar}
        banner={data.banner}
        user={user}
      />
      <div style={{ padding: "16px" }}>
        {user && data.bookings && <ProfileBookings bookings={data.bookings} />}
        {data.venues && <ProfileVenues venues={data.venues} user={user} />}
      </div>
    </div>
  );
};
