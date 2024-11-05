import styled from "styled-components";

export const StyledInputContainer = styled.div`
  font-weight: 800;
  position: relative;
  label {
    position: absolute;
    color: #6c757d;
    left: 1rem;
    top: 30px;
    transform: translateY(-50%);
    transition: transform 0.2s ease;
  }
  input,
  textarea {
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
  textarea {
    height: 120px;
    resize: none;
  }
  input:focus + label,
  input:not(:placeholder-shown) + label,
  textarea:focus + label,
  textarea:not(:placeholder-shown) + label {
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

export const StyledProgressContainer = styled.div`
  height: 8px;
  width: 100%;
`;

export const StyledProgressBar = styled.div<{ $percent?: number }>`
  background: ${(props) => props.theme.colors.secondary};
  width: calc(${(props) => props.$percent || 0} * 100%);
  height: 100%;
  border-radius: 0 16px 16px 0;
  transition: width 0.3s ease-in-out;
`;
