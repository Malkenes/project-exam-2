import styled from "styled-components";

export const StyledVenueList = styled.ul`
  display: flex;
  overflow: auto;
  gap: 24px;
  padding: 0;
  article {
    width: 320px;
    display: block;
    padding: 0;
    > div {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

export const StyledListContainer = styled.div`
  @media (min-width: 1025px) {
    background: white;
    padding: 32px 32px 32px 0;
    border-radius: 32px;
    max-width: 80%;
    ul {
      margin: 0;
    }
  }
`;
export const StyledContinentImage = styled.div<{ $img: string }>`
  position: absolute;
  background-image: url(${(props) => props.$img});
  background-size: cover;
  right: 0;
  top: 0;
  height: 100%;
  width: 50%;
  z-index: -1;
  clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%);
  @media (max-width: 1025px) {
    display: none;
  }
`;
