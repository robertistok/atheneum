import * as React from "react";
import { useAuth } from "./Layout";
import { requestAccount } from "./Main";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import logo from "../assets/logo.png";
import { green, blue1, purpleDark } from "../styles/colors";
import { Typography } from "@mui/material";

export const Navigation = () => {
  const { userId, error, setError, setUserId } = useAuth();
  console.log("userId", userId);
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
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Typography variant="h2"  sx={{marginLeft:'20px'}}>Athenaeum</Typography>
      </div>
      <div>
        <StyledList>
          <li>
            <Link to="/mint" underline="none">
              Create
            </Link>
          </li>
          <li>
            <Link to="/explore" underline="none">
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
    ">a": {
      underline: "none",
      textDecoration: "none",
      color: blue1,
      ":hover": {
        color: purpleDark,
      },
    },
    ">div": {
      border: `solid 2px ${blue1}`,
      borderRadius: "9999px",
      maxWidth: "200px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      padding: "0.5rem 1rem",
      cursor: "pointer",
      ":hover": {
        backgroundColor: purpleDark,
        color: "white",
        borderColor: purpleDark,
      },
    },
  },
});

const StyledLink = styled("Link")({
  ">span": {
    // underline: "none",
  },
});
