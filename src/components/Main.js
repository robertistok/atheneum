import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.jpg";
import { useAuth } from "./Layout";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// const secret = 'audit evolve board payment aspect beauty grass brave marriage alarm critic obey'

const StyledButton = styled(Button)({
  borderRadius: "20px",
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
  const [greeting, setGreetingValue] = useState("");
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

  // async function getGreeting() {
  //   if (typeof window.ethereum !== "undefined") {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const contract = new ethers.Contract(
  //       greeterAddress,
  //       Greeter.abi,
  //       provider
  //     );
  //     try {
  //       const data = await contract.greet();
  //       console.log("data", data);
  //     } catch (e) {
  //       console.log("Error", e);
  //     }
  //   }
  // }

  return (
    <Wrapper>
      <TextWrapper>
        <Typography variant="h1">
          Mint, explore or be part of a community
        </Typography>
        {errorrMessage.length ? <p>{errorrMessage}</p> : null}
        <Buttons>
          <StyledButton
            variant="contained"
            onClick={() => handleNavigation("/explore")}
          >
            Explore
          </StyledButton>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={() => handleNavigation("/mint")}
          >
            Create
          </StyledButton>
        </Buttons>
        <p>{greeting}</p>
      </TextWrapper>
      <ImageWrapper>{/* <img src={hero} alt="books" /> */}</ImageWrapper>
    </Wrapper>
  );
};

export { Main, requestAccount };
