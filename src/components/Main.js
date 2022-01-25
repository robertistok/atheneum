import React, { useState } from "react";

import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.jpg";
import { useAuth } from "./Layout";
import { blue1, purpleDark } from "../styles/colors";

// const secret = 'audit evolve board payment aspect beauty grass brave marriage alarm critic obey'

const StyledButton = styled(Button)({
  borderRadius: "9999px",
});

const Wrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "40% 1fr",
  width: "100%",
  alignItems: "center",
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
  minHeight: "400px",
});
const Buttons = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: "10px",
  "@media (max-width:900px)": {
    flexDirection: "column",
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

  return (
    <Wrapper>
      <TextWrapper>
        <Typography variant="h1">
          Mint, explore or be part of a community
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
