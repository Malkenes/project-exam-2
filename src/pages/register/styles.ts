import styled from "styled-components";

export const StyledRegister = styled.main`
  margin: 40px;
  max-width: 700px;
  margin: auto;
  hgroup {
    margin-bottom: 64px;
    h1 {
      margin-bottom: 16px;
    }
    p {
      max-width: 300px;
      color: #6c757d;
    }
  }

  h2 {
    font-weight: 500;
    text-align: center;
    margin: 48px;
  }
`;

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
  min-height: 700px;
  position: relative;
`;
