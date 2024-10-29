import { Link } from "react-router-dom";
import styled from "styled-components";

const buttonTheme = `
  padding: 0.5em 1.5em;
  border-radius: 1em;
  cursor: pointer;
  border: solid 1px;

`;

const primaryButtonTheme = `
    ${buttonTheme};
    border-color: #000;
    background: #000;
    color: #FFF;
    &:hover {
        background: #FFF;
        color: #000;
    }
`;

const secondaryButtonTheme = `
    ${buttonTheme};
    border-color: #8B8BDF;
    background: #FFF;
    color: #8B8BDF;
    &:hover {
        background: #8B8BDF;
        color: #FFF;
    }
`;

export const StyledPrimaryLink = styled(Link)`
  ${primaryButtonTheme};
`;
export const StyledSecondaryLink = styled(Link)`
  ${secondaryButtonTheme};
`;
