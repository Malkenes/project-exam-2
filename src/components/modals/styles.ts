import styled, { keyframes } from "styled-components";
import { StyledFullButton } from "../buttons/styles";

const fadeIn = keyframes`
from {opacity: 0;}
to {opacity: 1;}
`;

export const StyledModalWrapper = styled.span`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 998;
`;

export const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background: white;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  min-width: 200px;
  padding: 1rem;
  border-radius: 1em;
  filter: drop-shadow(0 0 8px rgba(76, 76, 195, 0.25));
  animation: ${fadeIn} 200ms ease-in-out;
  z-index: 999;
`;

export const StyledDeleteButton = styled(StyledFullButton)`
  margin: 1rem 0;
  background: rgba(255, 0, 0, 0.1);
  border: solid 1px rgba(255, 0, 0, 0.3);
  color: red;
  &:hover {
    background: red;
  }
`;

export const StyledCloseModal = styled.button`
  font-size: 32px;
  display: flex;
  justify-content: flex-end;
  border: none;
  background: none;
  cursor: pointer;
`;
