import styled from "styled-components";

export const StyledBookingForm = styled.form`
  filter: drop-shadow(0 0 8px rgba(76, 76, 195, 0.25));
  background: white;
  padding: 16px;
  @media (min-width: 1025px) {
    display: flex;
  }
`;

export const StyledBookingInfo = styled.div`
  text-align: center;
  button {
    width: 100%;
    height: 56px;
  }
  @media (min-width: 786px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (min-width: 1025px) {
    flex-direction: column;
    width: 100%;
  }
`;
