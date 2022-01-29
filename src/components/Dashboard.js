import React, { useState, useEffect } from "react";
import {
  updateProviderAndContract,
  checkIfWalletIsConnected,
} from "../utils/common";

import daoAbiJson from "../abis/AthenaeumDAO_abi.json";
import daoAddressJson from "../abis/AthenaeumDAO_address.json";
import bookTokenAbiJson from "../abis/BookToken_abi.json";
import bookTokenAddressJson from "../abis/BookToken_address.json";
import { Typography, Box } from "@mui/material";

const Dashboard = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [contractBookToken, setContractBookToken] = useState(null);
  const [providerBookToken, setProviderBookToken] = useState(null);
  const addressBookToken = bookTokenAddressJson.address;
  const contractABIBookToken = bookTokenAbiJson.abi;
  const [contractDao, setContractDao] = useState(null);
  const [providerDao, setProviderDao] = useState(null);
  const addressDao = daoAddressJson.address;
  const contractABIDao = daoAbiJson.abi;
  const [supply, setSupply] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setCurrentAccount);
    updateProviderAndContract(
      addressBookToken,
      contractABIBookToken,
      setProviderBookToken,
      setContractBookToken
    );
    updateProviderAndContract(
      addressDao,
      contractABIDao,
      setProviderDao,
      setContractDao
    );
  }, []);

  console.log("contract", contractABIBookToken);
  //   console.log("DAO", contractDao);
  const getTotalSupply = async () => {
    try {
      if (!contractBookToken) return;
      const res = await (await contractBookToken.totalSupply()).toString();
      setSupply(res);
    } catch (err) {
      console.log("error for supply", err);
    }
  };
  console.log("supply", supply);
  useEffect(() => {
    getTotalSupply();
  }, []);

  return (
    <>
      <Box sx={{ width: "100vw" }}>
        <Typography variant="h2" gutterBottom>
          Dashboard
        </Typography>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h4">Total supply of $BOOK tokens:</Typography>
          <Typography variant="body1" color="blue">
            {supply} $BOOK
          </Typography>
        </div>
      </Box>
    </>
  );
};
export { Dashboard };
