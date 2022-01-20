import * as React from "react";
import { useAuth } from "./Layout";
import { requestAccount } from "./Main";
import { ethers } from "ethers";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import logo from "../assets/logo.png";
import { green, blue1 } from "../styles/colors";

export const Navigation = () => {
  const { userId, error, setError, setUserId } = useAuth();
  const handleClick = () => {
    requestAccount(setError, setUserId);
  };

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
            {userId ? (
              <div>{userId}</div>
            ) : (
              <div onClick={handleClick}>Connect your wallet</div>
            )}
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
    ">div": {
      border: `solid 2px ${blue1}`,
      borderRadius: "9999px",
      maxWidth: "200px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      padding: "0.5rem 1rem",
    },
  },
});
