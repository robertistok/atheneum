import React from "react";
import { Button, Typography } from "@mui/material";
import { books } from "../assets/books";
import styled from "@emotion/styled";
import { purple } from "@mui/material/colors";

export const Explore = () => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h1">Explore</Typography>
        <Wrapper>
          {books.map((book) => {
            return (
              <>
                <Book>
                  <Cover></Cover>
                  <Typography variant="h4">{book.name}</Typography>
                  <Button variant="outlined" size="small">
                    Buy
                  </Button>
                </Book>
              </>
            );
          })}
        </Wrapper>
      </div>
    </>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  flexFlow: "wrap",
  alignItems: "center",
});

const Book = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginRight:'20px'
});
const Cover = styled("div")({
  height: "150px",
  width: "170px",
  backgroundColor: "pink",
});
