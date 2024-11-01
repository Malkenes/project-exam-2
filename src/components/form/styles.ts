import styled from "styled-components";

export const StyledInputContainer = styled.div`
  font-weight: 800;
  position: relative;
  label {
    position: absolute;
    color: #6c757d;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    transition: transform 0.2s ease;
  }

  input {
    font-size: 16px;
    padding: 1.8rem 1rem 0.5rem 1rem;
    min-width: 300px;
    width: 100%;
    box-sizing: border-box;
    font-weight: 800;
    border-radius: 4px;
    border: solid 0.5px #6c757d;
    &:focus-visible {
      outline: auto 1px ${(props) => props.theme.colors.secondary};
    }
    &::placeholder {
      opacity: 0;
    }
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    font-size: 12px;
    transform: translateY(-150%);
  }
`;
export const StyledCheckContainer = styled.div`
  margin-bottom: 3em;
`;
export const StyledErrorContainer = styled.div`
  margin-bottom: 3rem;
  p {
    position: absolute;
    color: red;
  }
`;
