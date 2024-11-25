import styled from "styled-components";

export const StyledMetaList = styled.ul`
  padding: 0;
  margin: 8px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  li {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 4px 8px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
  }
`;
