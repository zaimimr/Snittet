import { ThemeProvider } from "@material-ui/core";
import { StudieProvider } from "contexts/StudiesContext";
import React from "react";
import { CookiesProvider } from "react-cookie";
import theme from "theme";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <StudieProvider>{children}</StudieProvider>
        </CookiesProvider>
      </ThemeProvider>
    </>
  );
}

export default Provider;
