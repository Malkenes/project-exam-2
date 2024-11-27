import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
html {
 --color-primary: #000000;
 --color-secondary: #8B8BDF;
}
body {
    font-family: "DM Sans", sans-serif;
    background-color: #FFF;
    color: #2F2F33;
    margin: 0;
}

#root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
    position: relative;
}

hgroup {
    margin: 0 1rem;
}

h2 {
    font-weight: 500;
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

@media(min-width: 786px) {
    hgroup {
        margin: 0 2rem;
    }
}
`;
