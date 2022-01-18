import * as React from "react";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import logo from "../assets/logo.png";

export const Navigation = () => {
  return (
    <Box
      sx={{
        typography: "h4",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "40px",
        paddingRight: "20px",
      }}
    >
      <Link href="/">
        <img src={logo} alt="logo" />
      </Link>
      <div>
        <StyledList>
          <li>
            <Link href="/" underline="none">
              Home
            </Link>
          </li>
          <li>
            <Link href="/mint" underline="none">
              Create
            </Link>
          </li>
          <li>
            <Link href="/explore" underline="none">
              Explore
            </Link>
          </li>
          <li>
            <Avatar />
          </li>
        </StyledList>
      </div>
    </Box>
  );
};

const StyledList = styled("ul")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  listStyle: "none",
  ">li": {
    marginLeft: "20px",
    marginRight: "20px",
  },
});
