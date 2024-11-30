import styled from "styled-components";

export const StyledBookingForm = styled.form`
  background: white;
  border-top: solid 1px;
  margin-bottom: 16px;
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

export const StyledPriceContainer = styled.div`
  p {
    font-size: 24px;
    font-weight: 700;
    text-decoration: underline;
    margin-bottom: 4px;
  }
`;
