import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { purple, purpleDark, blue1 } from "./colors";

const theme = createTheme({
  typography: {
    fontFamily: [
      '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    ].join(","),
    allVariants: {
      color: purpleDark,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: 1.5,
    },
    h1: {
      fontSize: "clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)",
      fontWeight: 800,
      lineHeight: 1.1142857142857143,
    },
    h2: {
      fontSize: "clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)",
      fontWeight: 800,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "2.25rem",
      fontWeight: 400,
      letterSpacing: 0.2,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: 0.2,
      lineHeight: 1.5,
    },
  },
  palette: {
    primary: {
      main: purple,
      dark: purpleDark,
    },
    secondary: {
      main: blue1,
      dark: purpleDark,
    },
  },
});

export default responsiveFontSizes(theme);
