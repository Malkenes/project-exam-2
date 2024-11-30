import { useHolidazeStore } from "../../../../stores";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as S from "./styles";
import { StyledLink } from "../../../buttons/styles";
import React from "react";
import { SignOutButton } from "../../../buttons/signOutButton";

/**
 * Navigation bar component for the Holidaze application.
 *
 * This component renders the navigation bar, including both mobile
 * and desktop navigation menus. It adapts the display based on the
 * screen size.
 *
 * @component
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export const NavBar: React.FC = () => {
  return (
    <S.StyledNav>
      <MobileNav />
      <DesktopNav />
    </S.StyledNav>
  );
};

/**
 * Mobile navigation component for the Holidaze application.
 *
 * This component renders a user button that toggles the visibility
 * of the navigation menu. When the button is clicked, it opens or
 * closes a modal that displays the user profile component and
 * navigation links.
 *
 * @component
 * @returns {JSX.Element} The rendered mobile navigation component.
 */
const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userData = useHolidazeStore((state) => state.userData);
  return (
    <S.StyledMobileNav>
      <S.StyledUserButton
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundImage: `url(${userData.avatar.url})` }}
      ></S.StyledUserButton>
      {isOpen && (
        <>
          <span onClick={() => setIsOpen(!isOpen)}></span>
          <S.MenuModal
            style={{ backgroundImage: `url(${userData.banner.url})` }}
          >
            <div>
              <img src={userData.avatar.url} alt={userData.avatar.alt} />
              <h3>{userData.name}</h3>
            </div>
            <NavLinks />
          </S.MenuModal>
        </>
      )}
    </S.StyledMobileNav>
  );
};

/**
 * Desktop navigation component for the Holidaze application.
 *
 * This component renders the navigation links specifically designed
 * for desktop users. It uses the `NavLinks` component to display
 * the available navigation options.
 *
 * @component
 * @returns {JSX.Element} The rendered desktop navigation component.
 */
const DesktopNav: React.FC = () => {
  return (
    <S.StyledDesktopNav>
      <NavLinks />
    </S.StyledDesktopNav>
  );
};

/**
 * Navigation links component for the Holidaze application.
 *
 * This component renders different navigation links based on the
 * user's role, which is determined by the `userRole` from the
 * user store. It conditionally displays links for managers,
 * guests, and registered users.
 *
 * @component
 * @returns {JSX.Element} The rendered navigation links component.
 */
const NavLinks: React.FC = () => {
  const userData = useHolidazeStore((state) => state.userData);
  return (
    <S.StyledNavLinks>
      {userData.venueManager ? (
        <li>
          <Link to={"/profile/"}>Manager Dashboard</Link>
        </li>
      ) : (
        <li>
          <Link to={"/edit/profile"}>Become a Venue Manager</Link>
        </li>
      )}
      {userData.accessToken && (
        <li>
          <Link to={"/profile/"}>View Bookings</Link>
        </li>
      )}
      {!userData.accessToken ? (
        <li>
          <StyledLink to={"/signin"} $variant="secondary">
            Sign in
          </StyledLink>
        </li>
      ) : (
        <li>
          <SignOutButton />
        </li>
      )}
      {!userData.accessToken && (
        <li>
          <StyledLink to={"/register"} $variant="primary">
            Register
          </StyledLink>
        </li>
      )}
    </S.StyledNavLinks>
  );
};
