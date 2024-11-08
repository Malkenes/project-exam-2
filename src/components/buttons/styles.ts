import { Link } from "react-router-dom";
import styled from "styled-components";

const buttonTheme = `
  padding: 0.5em 1.5em;
  border-radius: 1em;
  cursor: pointer;
  border: solid 1px;
`;

interface StyledButtonProps {
  $variant: "primary" | "secondary";
}

export const StyledLink = styled(Link)<StyledButtonProps>`
  ${buttonTheme}
  background: ${(props) =>
    props.$variant === "primary" ? props.theme.colors.primary : "#FFF"};
  border-color: ${(props) =>
    props.$variant === "primary"
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
  color: ${(props) =>
    props.$variant === "primary" ? "#FFF" : props.theme.colors.secondary};
  &:hover {
    background: ${(props) =>
      props.$variant === "primary" ? "#FFF" : props.theme.colors.secondary};
    color: ${(props) =>
      props.$variant === "primary" ? props.theme.colors.primary : "#FFF"};
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
  ${buttonTheme}
  background: ${(props) =>
    props.$variant === "primary" ? props.theme.colors.primary : "#FFF"};
  border-color: ${(props) =>
    props.$variant === "primary"
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
  color: ${(props) =>
    props.$variant === "primary" ? "#FFF" : props.theme.colors.secondary};
  &:hover {
    background: ${(props) =>
      props.$variant === "primary" ? "#FFF" : props.theme.colors.secondary};
    color: ${(props) =>
      props.$variant === "primary" ? props.theme.colors.primary : "#FFF"};
  }
`;

export const StyledFullButton = styled(StyledButton)`
  width: 100%;
  height: 60px;
`;
