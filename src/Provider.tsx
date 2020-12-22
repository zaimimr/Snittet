import { ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "contexts/SnackbarContext";
import { StudieProvider } from "contexts/StudiesContext";
import React from "react";
import { CookiesProvider } from "react-cookie";
import theme from "theme";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CookiesProvider>
            <StudieProvider>{children}</StudieProvider>
          </CookiesProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default Provider;
