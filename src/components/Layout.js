import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export const AuthContext = React.createContext(null);

export const Layout = ({ children }) => {
  const [userId, setUserId] = React.useState(null);
  const [error, setError] = React.useState(false);
  return (
    <>
      <AuthContext.Provider value={{ userId, setUserId, error, setError }}>
        <Navigation />
        <StyledContainer>{children}</StyledContainer>
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
