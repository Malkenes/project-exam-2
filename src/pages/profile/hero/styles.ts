import styled from "styled-components";

export const StyledProfile = styled.div`
  position: relative;
  padding: 0 1em;
`;

export const StyledBanner = styled.div<{ $backgroundImage?: string }>`
  position: absolute;
  z-index: -1;
  left: 0;
  height: 80px;
  width: 100%;
  background: ${(props) => `url(${props.$backgroundImage})`};
`;

export const StyledUser = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1em;
  padding-top: 40px;
  div {
    position: relative;
  }
  a {
    position: absolute;
    bottom: 0;
    background: none;
    border: none;
  }
  img {
    height: 128px;
    width: 128px;
    border-radius: 50%;
    border: solid 1px ${(props) => props.theme.colors.secondary};
  }
`;
