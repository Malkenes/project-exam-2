import styled from "styled-components";

export const StyledSearchContainer = styled.div`
  padding: 16px;
  max-width: 800px;
  background: white;
  border-radius: 16px;
  margin: 16px;
  filter: drop-shadow(0 0 8px rgba(76, 76, 195, 0.25));
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 786px) {
    padding: 48px;
    margin: 16px auto;
  }
`;

export const StyledSearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (min-width: 1025px) {
    flex-direction: row;
    gap: 24px;
  }
`;
export const StyledDatePicker = styled.div`
  display: flex;
  @media (min-width: 786px) {
    min-width: 280px;
    width: 280px;
    input {
      min-width: 50%;
    }
  }
`;
