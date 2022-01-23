import * as React from "react";
import { useAuth } from "./Layout";
import { requestAccount } from "./Main";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import logo from "../assets/logo.png";
import { green, blue1, purpleDark } from "../styles/colors";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItem, Menu, Typography, useMediaQuery } from "@mui/material";

export const Navigation = () => {
  const { userId, error, setError, setUserId } = useAuth();
  const handleClick = () => {
    requestAccount(setError, setUserId);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const matches = useMediaQuery("(min-width:768px)");
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
        <Typography variant="h2" sx={{ marginLeft: "20px" }}>
          Athenaeum
        </Typography>
      </div>
      <div>
        {matches ? (
          <StyledList>
            <li>
              <Link to="/mint">Create</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              {userId ? (
                <div>{userId}</div>
              ) : (
                <div onClick={handleClick}>Connect your wallet</div>
              )}
            </li>
          </StyledList>
        ) : (
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClickMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: "20ch",
                },
              }}
            >
              <MenuItem key="explore" onClick={handleClose}>
                <Link
                  to="/explore"
                  style={{
                    textDecoration: "none",
                    color: blue1,
                    fontWeight: 500,
                  }}
                >
                  Explore
                </Link>
              </MenuItem>
              <MenuItem key="mint" onClick={handleClose}>
                <Link
                  to="/mint"
                  style={{
                    textDecoration: "none",
                    color: blue1,
                    fontWeight: 500,
                  }}
                >
                  Mint
                </Link>
              </MenuItem>
            </Menu>
          </div>
        )}
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
