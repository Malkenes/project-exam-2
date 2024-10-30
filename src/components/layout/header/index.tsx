import { NavBar } from "./navBar";
import { StyledHeader } from "./styles";
import { useUserStore } from "../../../stores/useUserStore";

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
  const setUserRole = useUserStore((state) => state.setUserRole);
  return (
    <>
      <StyledHeader>
        <a>
          <img src="/img/logo_holidaze.png" alt="Logo" />
        </a>
        <NavBar />
      </StyledHeader>
      <button onClick={() => setUserRole("customer")}>customer</button>
      <button onClick={() => setUserRole("manager")}>Manager</button>
      <button onClick={() => setUserRole("guest")}>guest</button>
    </>
  );
};
