import styled from "styled-components";

export const StyledInformation = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  min-height: 600px;
`;

export const StyledInformationExtended = styled.div`
  display: none;
  min-width: 50%;
  h3 {
    font-size: 24px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.secondary};
  }
  > div {
    max-width: 400px;
    margin: auto;
  }
  @media (min-width: 786px) {
    display: block;
  }
`;
