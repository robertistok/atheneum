import React, { useState } from "react";
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

export const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <StyledContainer>{children}</StyledContainer>
    </>
  );
};
