import styled from "styled-components";

export const StyledProductCard = styled.article`
  margin: auto;
  padding: 16px;
  h3 {
    margin-top: 4px;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  p {
    margin: 0;
  }

  @media (min-width: 600px) {
    display: flex;
    > div {
      width: 50%;
    }
  }
`;

export const StyledImageContainer = styled.div`
  width: 100%;
  height: 256px;
  box-shadow: 0px 4px 4px 2px rgba(76, 76, 195, 0.25);
  border-radius: 16px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    object-fit: cover;
  }
`;
export const StyledProductInfo = styled.div`
  padding: 8px 16px;
`;
export const StyledProductLocation = styled.div`
  display: flex;
  justify-content: space-between;
  color: #6c757d;
  font-weight: 500;
`;

export const StyledProductPrice = styled.div`
  font-size: 24px;
  font-weight: 800;
`;
