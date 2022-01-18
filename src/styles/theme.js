import { createTheme } from "@mui/material/styles";
import { purple, purpleDark, blue1, blue2, blue3, green, text } from "./colors";

export const theme = createTheme({
  typography: {
    fontFamily: [
      '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    ].join(","),
    body1: {
      coor: text,
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: 1.5,
    },
    h1: {
      color: text,
      fontSize: "clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)",
      fontWeight: 800,
      lineHeight: 1.1142857142857143,
    },
    h2: {
      fontSize: "clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)",
      fontWeight: 800,
      lineHeight: 1.2,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.75,
      textTransform: "initial",
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
      main: text,
    },
    secondary: {
      main: green,
    },
    text: {
      primary: "#1A2027",
      secondary: "#3E5060",
    },
  },
});
