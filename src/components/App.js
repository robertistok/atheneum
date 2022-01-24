import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../styles/theme";
import Mint from "./Mint";
import { Main } from "./Main";
import { Explore } from "./Explore";
import { Layout } from "./Layout";
import {
  updateProviderAndContract,
  checkIfWalletIsConnected,
} from "../utils/common";

import abiJson from "../abis/abi.json";
import addressJson from "../abis/address.json";
import { MyBooks } from "./MyBooks";

const routes = [
  { path: "/", component: Main },
  { path: "/mint", component: Mint },
  { path: "/explore", component: Explore },
];

const App = () => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const address = addressJson.address;
  const contractABI = abiJson.abi;
  const customTheme = createTheme(theme);

  useEffect(() => {
    checkIfWalletIsConnected(setCurrentAccount);
    updateProviderAndContract(address, contractABI, setProvider, setContract);
  }, []);
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Main contract={contract} />} />
            <Route path="/mint" element={<Mint contract={contract} />} />
            <Route path="/explore" element={<Explore contract={contract} />} />
            <Route path="/mybooks" element={<MyBooks contract={contract} />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
