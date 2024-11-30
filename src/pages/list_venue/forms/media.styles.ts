import styled from "styled-components";

export const StyledMedia = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;

  @media (min-width: 786px) {
    flex-direction: row-reverse;
    > div {
      width: 50%;
    }
  }
`;

export const StyledMediaExtended = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > img {
    width: 100%;
    height: 200px;
  }
`;

export const StyledAddedMedia = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  > div {
    width: 10%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  button {
    background: red;
  }
`;
