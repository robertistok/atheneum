import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Button } from "@mui/material";

import { purpleDark } from "../styles/colors";

export const Book = ({ book, handleBuy }) => {
  const { bookDiv, title, button } = useStylesRoot();

  return (
    <div className={bookDiv}>
      <Typography variant="h4" className={title}>
        {book.name}
      </Typography>
      <Cover url={book.imageUrl}></Cover>
      {handleBuy ? (
        <Button
          variant="outlined"
          size="small"
          className={button}
          onClick={() => handleBuy({ bookId: book.tokenId, price: book.price })}
        >
          Buy
        </Button>
      ) : null}
    </div>
  );
};

const useStylesRoot = makeStyles((theme) => ({
  bookDiv: {
    display: "flex",
    flexDirection: "column",
    margin: "20px",
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
    padding: "5px 0",
  },
  button: {
    border: "2px solid",
    borderRadius: "9999px",
    "&:hover": {
      border: "2px solid",
      backgroundColor: purpleDark,
      color: "white",
    },
  },
  connect: {
    marginTop: "30px",
  },
}));

const useStyles = makeStyles({
  cover: {
    height: "350px",
    width: "100%",
    borderRadius: "10px",
    margin: "12px 0",
    overflow: "hidden",
    position: "relative",
    backgroundImage: (props) => `url("${props.url}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
  },
});

const Cover = ({ children, ...props }) => {
  const { cover } = useStyles(props);
  console.log(cover);
  return <div className={cover}>{children}</div>;
};
