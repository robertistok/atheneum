import React, { useEffect, useState, createContext } from "react";
import { Container } from "@mui/material";
import { Navigation } from "./Navigation";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "row",
  marginTop: "4rem",
  justifyContent: "space-around",
  alignItems: "center",
});

export const AuthContext = createContext(null);

export const Layout = ({ children, currentAccount }) => {
  const [userId, setUserId] = useState();
  const [error, setError] = useState(false);

  useEffect(() => setUserId(currentAccount), [currentAccount]);
  return (
    <>
      <AuthContext.Provider value={{ userId, setUserId, error, setError }}>
        <Navigation />
        <StyledContainer>{children}</StyledContainer>
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => React.useContext(AuthContext);
