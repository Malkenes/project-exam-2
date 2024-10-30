import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
from {opacity: 0;}
to {opacity: 1;}
`;

export const StyledNav = styled.nav``;

export const StyledMobileNav = styled.div`
  > span {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.01);
  }

  @media (min-width: 786px) {
    display: none;
  }
`;

export const MenuModal = styled.div`
  position: absolute;
  background: white;
  top: 72px;
  right: 1em;
  min-width: 200px;
  padding: 3em 1em;
  border-radius: 1em;
  filter: drop-shadow(0 0 8px rgba(76, 76, 195, 0.25));
  animation: ${fadeIn} 200ms ease-in-out;
`;

export const StyledDesktopNav = styled.div`
  display: none;

  @media (min-width: 786px) {
    display: block;
  }
`;

export const StyledNavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3em;
  padding: 0;
  font-size: 14px;
  font-weight: 500;

  @media (min-width: 786px) {
    flex-direction: row;
    gap: 1.5em;
  }
`;

export const StyledUserButton = styled.button`
  border-radius: 50%;
  background: black;
  cursor: pointer;
  padding: 6px 8px;
`;
