import { useUserStore } from "../../../../stores/useUserStore";
import { Link } from "react-router-dom";
import * as S from "./styles";
import {
  StyledPrimaryLink,
  StyledSecondaryLink,
} from "../../../buttons/styles";

export const NavBar: React.FC = () => {
  const userRole = useUserStore((state) => state.userRole);
  return (
    <S.StyledNav>
      <ul>
        <li>
          {userRole === "manager" ? (
            <Link to={"/"}>Manager Dashboard</Link>
          ) : (
            <Link to={"/"}>Become a Venue Manager</Link>
          )}
        </li>
        <li>{userRole !== "guest" && <Link to={"/"}>View Bookings</Link>}</li>
        <li>
          {userRole === "guest" ? (
            <StyledSecondaryLink to={"/"}>sign in</StyledSecondaryLink>
          ) : (
            <StyledSecondaryLink to={"/"}>sign out</StyledSecondaryLink>
          )}
        </li>
        <li>
          {userRole === "guest" && (
            <StyledPrimaryLink to={"/"}>register</StyledPrimaryLink>
          )}
        </li>
      </ul>
    </S.StyledNav>
  );
};
