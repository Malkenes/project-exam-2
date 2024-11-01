import { NavBar } from "./navBar";
import { StyledHeader } from "./styles";

/**
 * Header component for the Holidaze application.
 *
 * This component renders the header section of the application,
 * including the logo and the navigation bar. It serves as the
 * topmost part of the layout, providing users with access to
 * navigation links.
 *
 * @component
 * @returns {JSX.Element} The rendered header component.
 */
export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <a>
        <img src="/img/logo_holidaze.png" alt="Logo" />
      </a>
      <NavBar />
    </StyledHeader>
  );
};
