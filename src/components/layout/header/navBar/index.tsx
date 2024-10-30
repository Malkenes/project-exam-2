import { useUserStore } from "../../../../stores/useUserStore";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as S from "./styles";
import { StyledLink } from "../../../buttons/styles";
import React from "react";
import { FaUser } from "react-icons/fa";

export const NavBar: React.FC = () => {
  return (
    <S.StyledNav>
      <MobileNav />
      <DesktopNav />
    </S.StyledNav>
  );
};

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.StyledMobileNav>
      <S.StyledUserButton onClick={() => setIsOpen(!isOpen)}>
        <FaUser size={24} color="white" />
      </S.StyledUserButton>
      {isOpen && (
        <>
          <span onClick={() => setIsOpen(!isOpen)}></span>
          <S.MenuModal>
            <div>profile component</div>
            <NavLinks />
          </S.MenuModal>
        </>
      )}
    </S.StyledMobileNav>
  );
};

const DesktopNav: React.FC = () => {
  return (
    <S.StyledDesktopNav>
      <NavLinks />
    </S.StyledDesktopNav>
  );
};

const NavLinks: React.FC = () => {
  const userRole = useUserStore((state) => state.userRole);
  return (
    <S.StyledNavLinks>
      {userRole === "manager" ? (
        <li>
          <Link to={"/"}>Manager Dashboard</Link>
        </li>
      ) : (
        <li>
          <Link to={"/"}>Become a Venue Manager</Link>
        </li>
      )}
      {userRole !== "guest" && (
        <li>
          <Link to={"/"}>View Bookings</Link>
        </li>
      )}
      {userRole === "guest" ? (
        <li>
          <StyledLink to={"/"} variant="secondary">
            Sign in
          </StyledLink>
        </li>
      ) : (
        <li>
          <StyledLink to={"/"} variant="secondary">
            Sign out
          </StyledLink>
        </li>
      )}
      {userRole === "guest" && (
        <li>
          <StyledLink to={"/"} variant="primary">
            Register
          </StyledLink>
        </li>
      )}
    </S.StyledNavLinks>
  );
};
