import styled from "styled-components";

export const StyledLocation = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;

  @media (min-width: 786px) {
    flex-direction: row-reverse;
    align-items: center;
    > div {
      width: 50%;
    }
  }
`;
