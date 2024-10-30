import styled from "styled-components";

export const StyledFooter = styled.footer`
  text-align: center;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2em;
    padding: 2em;
    margin: 0;
  }

  img {
    height: 40px;
  }
`;

export const StyledQuickLinks = styled.div`
  background: #e5e5e5;

  a {
    font-size: 1em;
    font-weight: 800;
  }

  @media (max-width: 480px) {
    ul {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const StyledSocials = styled.div`
  a {
    background: #e5e5e5;
    padding: 0.8em;
    border-radius: 0.5em;
    display: flex;
  }
`;
