import styled from "styled-components";

export const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 0, 0, 0.1);
    padding: 0.5rem 1rem;
    margin: 1rem;
    border: solid 1px rgba(255, 0, 0, 0.3);
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
  }
`;
