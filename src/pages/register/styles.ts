import styled from "styled-components";

export const StyledRegister = styled.main``;

export const StyledOrderedList = styled.ol`
  margin-bottom: 48px;
  span {
    display: none;
  }
  li::marker,
  strong {
    font-size: 16px;
    font-weight: 800;
  }
  li {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 20px;
  }
  @media (min-width: 786px) {
    span {
      display: block;
    }
  }
`;

export const StyledFormWrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  form {
    padding: 0 1rem;
  }
  h2 {
    text-align: center;
    margin-bottom: 48px;
  }
`;

export const StyledMultiStepWrapper = styled.div`
  min-height: 600px;
  position: relative;
`;
