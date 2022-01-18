import React, { useState } from "react";
import { Button } from "@mui/material";
import hero from "../assets/hero.jpg";

export const Hero = ({ handleCreate, handleExplore }) => {
  return (
    <>
      <div className="wrapper">
        <div className="wrapper-text">
          <h1>"Mint books, explore books, be part of a community"</h1>
          <div className="wrapper-buttons">
            <Button size="small" variant="contained" onClick={handleExplore}>
              Explore
            </Button>
            <Button size="small" variant="contained" onClick={handleCreate}>
              Create
            </Button>
          </div>
        </div>
        <div>
          <img src={hero} />
        </div>
      </div>
    </>
  );
};
