import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

body {
    font-family: "DM Sans", sans-serif;
    background-color: #FFF;
    color: #2F2F33;
    margin: 0;
}

p {
    font-size: 14px;
}
ul {
    list-style: none;

    a {
        color: inherit;
        text-decoration: none;

        &:hover {
            color: #6C6CDF;
        }
    }
}
`;
