import styled from "styled-components";

export const StyledHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 1em;

  img {
    height: 40px;
  }

  @media (min-width: 1025px) {
    justify-content: flex-end;
    > a {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
