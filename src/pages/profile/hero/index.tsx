import { Link } from "react-router-dom";
import { Media } from "../../../shared/types";
import { FaUserEdit } from "react-icons/fa";
import * as S from "./styles";

interface Props {
  name: string;
  bio: string;
  avatar: Media;
  banner: Media;
  user: boolean;
}

export const ProfileHero: React.FC<Props> = ({
  name,
  bio,
  avatar,
  banner,
  user,
}) => {
  return (
    <S.StyledProfile>
      <S.StyledBanner $backgroundImage={banner.url} />
      <S.StyledUser>
        <div>
          {user && (
            <Link to={"/edit/profile"}>
              <FaUserEdit size={24} />
            </Link>
          )}
          <img src={avatar.url} alt={avatar.alt} />
        </div>
        <h1>{name}</h1>
      </S.StyledUser>
      <p>{bio}</p>
    </S.StyledProfile>
  );
};
