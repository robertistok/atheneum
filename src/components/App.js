import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../styles/theme";
import Mint from "./Mint";
import { Main } from "./Main";
import { Explore } from "./Explore";
import { Dashboard } from "./Dashboard";
import { Layout } from "./Layout";
import {
  updateProviderAndContract,
  checkIfWalletIsConnected,
} from "../utils/common";

import abiJson from "../abis/MintBook_abi.json";
import addressJson from "../abis/MintBook_address.json";
import { MyBooks } from "./MyBooks";

const App = () => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const address = addressJson.address;
  const contractABI = abiJson.abi;
  const customTheme = createTheme(theme);

  console.log(currentAccount);

  useEffect(() => {
    checkIfWalletIsConnected(setCurrentAccount);
    updateProviderAndContract(address, contractABI, setProvider, setContract);
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Layout currentAccount={currentAccount}>
          <Routes>
            <Route path="/" element={<Main contract={contract} />} />
            <Route
              path="/mint"
              element={<Mint contract={contract} provider={provider} />}
            />
            <Route
              path="/explore"
              element={<Explore contract={contract} provider={provider} />}
            />
            <Route path="/mybooks" element={<MyBooks contract={contract} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
