import styled from "styled-components";

export const StyledFormError = styled.p`
  color: red;
  font-size: 20px;
  margin-bottom: 48px;
`;
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
    border: solid 1px #6c757d7a;
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
export const StyledLockedInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  input,
  textarea {
    font-size: 16px;
    font-weight: 800;
    border-radius: 4px;
    border: 1px solid #59597b;
    color: #59597b;
    padding: 0.5rem 1rem;
    background: #e0e0f5;
  }
  textarea {
    height: 120px;
    resize: none;
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

export const StyledPreviewAvatar = styled.div`
  margin-bottom: 48px;
  img {
    border-radius: 50%;
    border: 1px solid;
    min-height: 160px;
    height: 160px;
    min-width: 160px;
    width: 160px;
  }
`;

export const StyledPreviewBanner = styled.div`
  margin-bottom: 48px;
  img {
    min-height: 160px;
    height: 160px;
    width: 100%;
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-bottom: 48px;
`;

export const StyledFieldSet = styled.fieldset`
  border: none;
  legend {
    font-weight: 800;
    color: #6c757d;
  }
  > div {
    display: flex;
    justify-content: space-around;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
`;

export const StyledFieldSetOption = styled.div<{ $checked: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: ${(props) => props.$checked && props.theme.colors.secondary};
  color: ${(props) => props.$checked && "white"};
  input {
    display: none;
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const StyledCheckAmenities = styled.div`
  min-width: 300px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  border: solid 0.5px #6c757d;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 48px;
  input {
    display: none;
    &:checked + label {
      background: ${(props) => props.theme.colors.secondary};
    }
  }
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56px;
  }
`;
