import React, { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// const secret = 'audit evolve board payment aspect beauty grass brave marriage alarm critic obey'

const StyledButton = styled(Button)({
  borderRadius: "20px",
});

const TextWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
    <>
      <TextWrapper>
        <p>Mint, explore or be part</p>
        {errorrMessage.length ? <p>{errorrMessage}</p> : null}
        <div>
          <StyledButton
            variant="contained"
            onClick={() => requestAccounts("/explore")}
          >
            Explore
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => requestAccounts("/mint")}
          >
            Create
          </StyledButton>
        </div>
        <p>{greeting}</p>
      </TextWrapper>
      <div>IMAGINE</div>
    </>
  );
};

export default Main;
