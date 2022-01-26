import React, { useState } from "react";

import { Button, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero3.png";
import { useAuth } from "./Layout";
import { blue1, purpleDark } from "../styles/colors";

const StyledButton = styled(Button)({
  borderRadius: "9999px",
});

const Wrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "40% 1fr",
  width: "100%",
  alignItems: "center",
  "@media (max-width:768px)": {
    gridTemplateColumns: "50% 1fr",
  },
  "@media (max-width:425px)": {
    gridTemplateColumns: "1fr",
  },
});
const TextWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});
const ImageWrapper = styled("div")({
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
  backgroundImage: `url(${hero})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "50% 50%",
  height: "400px",
  "@media (max-width:425px)": {
    marginTop: "20px",
  },
});
const Buttons = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: "10px",
  "@media (max-width:900px)": {
    flexDirection: "column",
  },
  "@media (max-width:425px)": {
    flexDirection: "row",
  },
  ">button": {
    marginRight: "30px",
    marginTop: "10px",
    padding: "10px 42px",
  },
});

const requestAccount = async (setError, setUserId) => {
  if (typeof window.ethereum === "undefined") {
    setError(true);
    return;
  }
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  setUserId(accounts[0]);
  return accounts[0];
};
const Main = () => {
  const [errorrMessage, setErrorMessage] = useState("");
  const { error, setError, setUserId } = useAuth();

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    const user = requestAccount(setError, setUserId);
    if (error) {
      setErrorMessage("Please Install Metamask");
    }
    if (user) {
      navigate(path);
    }
  };
  const smallScreen = useMediaQuery("(max-width:425px)");
  const mediumScreen = useMediaQuery("(min-width:768px)");
  return (
    <Wrapper>
      <TextWrapper>
        <Typography variant={mediumScreen ? "h1" : "h2"}>
          A decentralized and community owned ecosystem of the written word
        </Typography>
        {errorrMessage.length ? <p>{errorrMessage}</p> : null}
        <Buttons>
          <StyledButton
            variant="outlined"
            color="primary"
            onClick={() => handleNavigation("/explore")}
            sx={{
              border: "solid 2px",
              ":hover": {
                border: "solid 2px",
                backgroundColor: purpleDark,
                color: "white",
              },
            }}
          >
            Explore
          </StyledButton>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={() => handleNavigation("/mint")}
            sx={{
              border: "solid 2px",
              borderColor: blue1,
              ":hover": { borderColor: purpleDark },
            }}
          >
            Create
          </StyledButton>
        </Buttons>
      </TextWrapper>
      <ImageWrapper />
    </Wrapper>
  );
};

export { Main, requestAccount };
