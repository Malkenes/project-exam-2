import { NavBar } from "./navBar";
import { StyledHeader } from "./styles";
import { useUserStore } from "../../../stores/useUserStore";

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
