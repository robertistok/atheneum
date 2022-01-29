import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Button, CircularProgress } from "@mui/material";

import discordIcon from "../assets/discord.png";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import addressJson from "../abis/MintBook_address.json";

export const Book = ({
  book,
  handleBuy,
  download,
  discord,
  type,
  buyInProgress,
}) => {
  const { bookDiv, title, button, downloadLink } = useStylesRoot();
  const { priceEth, numberOfBooks, tokenId, price } = book;
  const [availableBooks, setAvailableBooks] = useState(numberOfBooks);

  return (
    <div className={bookDiv}>
      <Typography variant="h4" className={title}>
        {book.name}
      </Typography>
      <Cover url={book.imageUrl}></Cover>
      <Typography variant="body2" className={title}>
        {book.description}
      </Typography>
      {priceEth ? (
        <Typography variant="body1" gutterBottom>
          Price: {priceEth} ♦
        </Typography>
      ) : null}

      {type === "market" ? (
        <>
          {availableBooks ? (
            <Typography variant="body2" gutterBottom>
              {availableBooks > 0 ? (
                buyInProgress[tokenId] ? (
                  <CircularProgress size={20} />
                ) : (
                  `${availableBooks}  📚 available`
                )
              ) : (
                "Sold out!!"
              )}
            </Typography>
          ) : null}
          <Button
            variant="outlined"
            size="small"
            className={button}
            disabled={buyInProgress[tokenId] || false}
            {...(availableBooks > 0
              ? {
                  onClick: () =>
                    handleBuy({
                      bookId: tokenId,
                      price: price,
                      setAvailableBooks: setAvailableBooks,
                    }),
                }
              : {
                  component: "a",
                  href: `https://testnets.opensea.io/assets/${addressJson.address}/${tokenId}`,
                  target: "_blank",
                })}
          >
            {availableBooks > 0 ? (
              buyInProgress[tokenId] ? (
                <>
                  <Typography variant="body1">In progress </Typography>
                  <CircularProgress size={20} />
                </>
              ) : (
                <Typography variant="body1">Buy</Typography>
              )
            ) : (
              "Buy it on Opensea"
            )}
          </Button>
        </>
      ) : (
        <>
          {download ? (
            <a
              href={book.bookFile}
              download
              rel="noreferrer"
              target="_blank"
              className={`${downloadLink} ${button}`}
            >
              <Typography variant="body1">Download</Typography>
              <CloudDownloadIcon fontSize="medium" color="secondary" />
            </a>
          ) : null}
          {discord ? (
            <a
              href="https://discord.gg/yVq2UVsRRd"
              rel="noreferrer"
              target="_blank"
              className={`${downloadLink} ${button}`}
            >
              <Typography variant="body1">Discord</Typography>
              <img src={discordIcon} alt="discord" />
            </a>
          ) : null}
        </>
      )}
    </div>
  );
};

const useStylesRoot = makeStyles((theme) => ({
  bookDiv: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: "20px",
    marginLeft: "0px",
    height: "420px",
    minWidth: "250px",
    maxWidth: "250px",
    justifyContent: "space-between",
    border: "solid 1px grey",
    padding: "10px",
    borderRadius: "10px",
    "@media (max-width:768px)": {
      width: "350px",
    },
  },
  title: {
    wordWrap: "break-word",
    maxWidth: "170px",
    padding: "5px 0",
  },
  downloadLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
    justifyContent: "center",
    "&> img,svg": {
      width: "20px",
      height: "20px",
      marginLeft: "10px",
    },
  },
  button: {
    border: "1px solid grey",
    borderRadius: "5px",
    padding: "5px 8px",
    margin: "5px",
    willChange: "transform",
    boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
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
  return <div className={cover}>{children}</div>;
};
