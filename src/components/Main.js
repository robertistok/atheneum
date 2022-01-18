import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.jpg";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// const secret = 'audit evolve board payment aspect beauty grass brave marriage alarm critic obey'

const StyledButton = styled(Button)({
  borderRadius: "20px",
});

const Wrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "40% 1fr",
});
const TextWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});
const ImageWrapper = styled("div")({
  border: "solid 1px",
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
  ">img": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
});
const Buttons = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  ">button": {
    margin: "30px",
    padding: "10px 22px",
  },
});

const Main = () => {
  const [greeting, setGreetingValue] = useState("");
  const [errorrMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
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

  async function requestAccounts(path) {
    if (typeof window.ethereum === "undefined") {
      setErrorMessage("Please Install Metamask");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    // setGreetingValue(accounts[0]);
    navigate(path);
  }

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
            onClick={() => requestAccounts("/explore")}
          >
            Explore
          </StyledButton>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={() => requestAccounts("/mint")}
          >
            Create
          </StyledButton>
        </Buttons>
        <p>{greeting}</p>
      </TextWrapper>
      <ImageWrapper>
        <img src={hero} alt="books" />
      </ImageWrapper>
    </Wrapper>
  );
};

export default Main;
