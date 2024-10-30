import "styled-components";

interface Theme {
  colors: {
    primary: string;
    secondary: string;
  };
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
