import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#4EB9B6",
    },
    error: {
      main: "#C70039",
    },
    text: {
      primary: "#F2F2F2",
      secondary: "#aaaaaa",
    },
  },
  spacing: 4,
  shape: {
    borderRadius: 6,
  },
});

theme.overrides = {
  ...theme.overrides,
  MuiTypography: {
    root: {
      fontFamily: "Roboto",
      fontWeightRegular: "bold",
      fontWeightMedium: "bold",
    },
    h1: {
      fontSize: "120px",
      lineHeight: "120px",
    },
    h2: {
      fontSize: "48px",
      lineHeight: "48px",
    },
    h3: {
      fontSize: "38px",
      lineHeight: "38px",
    },
    body1: {
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: "bold",
    },
  },
  // @ts-ignore
  MuiAutocomplete: {
    inputRoot: {
      background:
        "radial-gradient(86.5% 86.5% at 6% 21.5%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.05) 100%);",
      backdropFilter: "blur(12px)",
      borderRadius: theme.shape.borderRadius,
    },
    paper: {
      background: "rgba(24, 24, 24, 0.9)",
      backdropFilter: "blur(12px);",
    },
  },
  MuiFormLabel: {
    root: {
      color: theme.palette.text.primary,
    },
  },
};

export default theme;
