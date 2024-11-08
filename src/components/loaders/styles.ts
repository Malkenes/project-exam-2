import styled, { keyframes } from "styled-components";

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
`;
const flash = keyframes`
    0% {
        background: #0002;
        box-shadow: 32px 0 #0002, -32px 0 #000;
    }
    50% {
        background: #000;
        box-shadow: 32px 0 #0002, -32px 0 #0002;
    }
    100% {
        background: #0002;
        box-shadow: 32px 0 #000, -32px 0 #0002;
    }
`;

export const StyledLoader = styled.span`
  width: 16px;
  height: 16px;
  background: #000;
  box-shadow:
    32px 0 #000,
    -32px 0 #000;
  position: relative;
  border-radius: 50%;
  display: block;
  box-sizing: border-box;
  animation: ${flash} 0.5s ease-in infinite alternate;
`;
