import styled from "styled-components";

export const StyledHomePage = styled.div`
  > div {
    padding: 16px;
    position: relative;
    min-height: 400px;
  }
  @media (min-width: 786px) {
    > div {
      padding: 32px;
    }
  }
`;

export const StyledInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 24px;
  filter: drop-shadow(0 0 8px rgba(76, 76, 195, 0.25));
  background: white;
  padding: 64px;
  border-radius: 32px;
  @media (min-width: 1025px) {
    flex-direction: row;
    gap: 64px;
  }
`;
