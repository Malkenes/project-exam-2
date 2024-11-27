import styled from "styled-components";

export const StyledColumn = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const StyledGrid = styled(StyledColumn)`
  @media (min-width: 786px) {
    flex-direction: row;
    flex-wrap: wrap;
    li {
      width: calc(50% - 16px);
    }
  }
  @media (min-width: 1025px) {
    li {
      width: calc(33% - 17px);
    }
  }
`;

export const StyledBooking = styled.div<{ $expired?: boolean }>`
  opacity: ${(props) => (props.$expired ? "0.5" : "1")};
  background: white;
  filter: drop-shadow(0 0 8px rgba(76, 76, 195, 0.25));
  text-align: center;
  width: 100%;
  h3 {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
  }
  img {
    height: 48px;
    width: 100%;
    object-fit: cover;
  }
  > div {
    display: flex;
    justify-content: space-between;
    padding: 0.5em;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  span {
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  @media (min-width: 786px) {
    img {
      height: 200px;
    }
  }
`;

export const StyledDate = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  span {
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
