import { createTheme } from "@mui/material/styles";
import { purple, purpleDark, blue1, blue2, blue3, green, text } from "./colors";

export const theme = createTheme({
  typography: {
    fontFamily: [
      '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    ].join(","),
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: 1.5,
    },
  },
  palette: {
    primary: {
      main: purple,
    },
    secondary: {
      main: green,
    },
  },
});
