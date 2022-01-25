import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const BookNFT = ({ book }) => {
  const { root, explore, wrapper, bookDiv, title, imageWrapper } =
    useStylesRoot();
  return (
    <div className={bookDiv}>
      <Typography variant="h2" className={title}>
        {book.name}
      </Typography>
      <div className={imageWrapper}>
        <img src={book.imageUrl} />
      </div>
    </div>
  );
};

const useStylesRoot = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start",
  },
  explore: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexFlow: "wrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "30px auto",
  },
  bookDiv: {
    display: "flex",
    flexDirection: "column",
    marginRight: "40px",
    marginBottom: "40px",
    height: "420px",
    width: "250px",
    justifyContent: "space-between",
    border: "solid 1px grey",
    padding: "10px",
    borderRadius: "10px",
    "@media (max-width:768px)": {
      width: "230px",
    },
  },
  title: {
    wordWrap: "break-word",
    maxWidth: "170px",
    alignSelf: "center",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    border: "solid 1px",
    borderRadius: "10px",
    "&>img": {
      objectFit: "cover",
      width: "100%",
      height: "100%",
    },
  },
}));
