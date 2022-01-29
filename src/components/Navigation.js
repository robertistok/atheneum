import * as React from "react";
import { useAuth } from "./Layout";
import { requestAccount } from "./Main";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import logo from "../assets/logo.png";
import { blue1, purpleDark } from "../styles/colors";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItem, Menu, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const Navigation = () => {
  const { userId, setError, setUserId } = useAuth();
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
  const mediumScreen = useMediaQuery("(min-width:768px)");
  const styles = useStyles();
  return (
    <Box
      sx={{
        typography: "h4",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <div className={styles.root}>
        <Link to="/">
          <img src={logo} alt="logo" width={130} height={130} />
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h2" sx={{ marginLeft: "20px" }}>
            Books on chain
          </Typography>
        </Link>
      </div>
      <div>
        {mediumScreen ? (
          <ul className={styles.nav}>
            <li className={styles.navItem}>
              <Link to="/mint">Create</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/explore">Explore</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/mybooks">My Books</Link>
            </li>
            <li>
              {userId ? (
                <div className={styles.user}>{userId}</div>
              ) : (
                <div className={styles.user} onClick={handleClick}>
                  Connect your wallet
                </div>
              )}
            </li>
          </ul>
        ) : (
          <div className={styles.nav}>
            {userId ? (
              <div className={styles.user}>{userId}</div>
            ) : (
              <div className={styles.user} onClick={handleClick}>
                Connect your wallet
              </div>
            )}
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
              <MenuItem key="mybooks" onClick={handleClose}>
                <Link
                  to="/mybooks"
                  style={{
                    textDecoration: "none",
                    color: blue1,
                    fontWeight: 500,
                  }}
                >
                  My Books
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

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    listStyle: "none",
  },
  navItem: {
    marginLeft: "20px",
    marginRight: "20px",
    "& >a": {
      underline: "none",
      textDecoration: "none",
      color: blue1,
      ":hover": {
        color: purpleDark,
      },
    },
  },
  user: {
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
    "@media (max-width:768px)": {
      width: "150px",
    },
    "@media (max-width:425px)": {
      width: "50px",
    },
  },
});
