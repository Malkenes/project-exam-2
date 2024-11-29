import styled from "styled-components";
import { StyledInputContainer } from "../styles";
import { StyledFullButton } from "../../buttons/styles";

export const StyledSearchContainer = styled.div`
  background: white;
  border-radius: 16px;
  filter: drop-shadow(0 0 8px rgba(76, 76, 195, 0.25));
  padding: 16px;
  margin: 16px;
  display: flex;
  max-width: 400px;
  flex-direction: column;
  align-items: center;
  @media (min-width: 500px) {
    margin: 16px auto;
  }

  @media (min-width: 786px) {
    max-width: 700px;
    padding: 32px;
  }

  @media (min-width: 1025px) {
    max-width: 800px;
    padding: 48px;
  }
`;

export const StyledSearchForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-areas:
    "query"
    "datepicker"
    "guests"
    "button";
  gap: 48px;
  @media (min-width: 500px) {
    gap: 24px;
    grid-template-areas:
      "query query"
      "datepicker guests"
      "button button";
  }
  @media (min-width: 1025px) {
    grid-template-areas: "query datepicker guests button";
  }
`;
export const StyledDatePicker = styled.div`
  grid-area: datepicker;
  display: flex;
  input {
    min-width: 100px;
  }
`;

export const StyledQueryInput = styled(StyledInputContainer)`
  grid-area: query;
`;

export const StyledGuestInput = styled(StyledInputContainer)`
  grid-area: guests;
  input {
    min-width: 60px;
  }
`;

export const StyledSearchButton = styled(StyledFullButton)`
  grid-area: button;
`;
