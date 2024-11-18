import styled from "styled-components";
export const StyledVenuePage = styled.main`
  hgroup {
    text-align: center;
    margin-bottom: 48px;
    background: white;
    padding: 24px;
    filter: drop-shadow(0 0 8px rgba(76, 76, 195, 0.25));
    p {
      max-width: 342px;
      margin: auto;
    }
  }
`;

export const StyledMediaGallery = styled.div`
  height: 400px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(5, 20%);
  div {
    padding: 8px;
    cursor: pointer;
    &:first-child {
      grid-column: 1/6;
      grid-row: 1/5;
      cursor: default;
    }
  }
  img {
    border-radius: 8px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  @media (min-width: 786px) {
    div {
      &:first-child {
        grid-column: 1/5;
        grid-row: 1/6;
      }
    }
  }
`;

export const StyledInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
  gap: 24px;
  > div {
    max-width: 358px;
    width: 358px;
  }
  @media (min-width: 786px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const StyledRating = styled.div`
  text-align: center;
  div {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    background: #ffd250;
    padding: 4px 16px;
    font-size: 32px;
    font-weight: 800;
  }
`;
