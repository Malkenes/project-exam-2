import styled from "styled-components";

export const StyledColumn = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const StyledVenue = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0 0 8px rgba(76, 76, 195, 0.25));
  max-height: 500px;
  ul {
    overflow-y: auto;
  }
  img {
    height: 48px;
    width: 100%;
    object-fit: cover;
  }

  @media (min-width: 786px) {
    flex-direction: row;
    > * {
      width: 50%;
    }
    img {
      height: 300px;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8em 0.5em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  h3 {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
  }
  @media (min-width: 768px) {
    border-bottom: none;
  }
`;

export const StyledBookingContainer = styled.div`
  position: relative;
  height: 200px;
  padding: 0.5rem;
  @media (min-width: 786px) {
    height: auto;
  }
`;
export const BookingList = styled.ul`
  padding: 0;
  height: 100%;
  overflow-y: auto;
`;
export const BookingItem = styled.li`
  padding: 0.5rem;
  &:nth-child(even) {
    background-color: rgba(139, 139, 223, 0.1);
  }
  &:nth-child(odd) {
    background-color: white;
  }
`;

export const StyledDate = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
