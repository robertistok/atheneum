import React from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { buyBookNft } from "../utils/common";
import { useAuth } from "./Layout";
import { requestAccount } from "./Main";
import { BookNFT } from "./BookNFT";
import { purpleDark } from "../styles/colors";

export const Explore = ({ contract }) => {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBooks = async () => {
    try {
      if (!contract) {
        return;
      }

      const counter = await contract.bookIds();
      const counterInt = parseInt(counter._hex, 16);

      const allBooks = await Promise.all(
        Array(counterInt)
          .fill()
          .map(async (_, index) => {
            const tokenId = index;
            // const ownerOf = await contract.ownerOf(tokenId);
            const book = await contract.books(tokenId);

            try {
              const response = await (await fetch(book.URI)).json();
              const { name, description, properties, image } = response;

              const bookFileUrl = properties.bookFile.split("//");
              const coverUrl = image.split("//");
              return {
                price: book.price,
                tokenId,
                imageUrl: `https://ipfs.io/ipfs/${coverUrl[1]}`,
                bookFile: `https://ipfs.io/ipfs/${bookFileUrl[1]}`,
                name,
                description,
              };
            } catch (err) {
              console.log("error", err);
              return {
                tokenId,
                imageUrl: "https://error404.fun/img/illustrations/09@2x.png",
                name: tokenId,
              };
            }
          })
      );

      setLoading(false);
      setBooks(allBooks);
    } catch (error) {
      console.log("fetchNfts error: ", error);
      setLoading(false);
    }
  };

  const { root, explore, wrapper, button, bookWrapper } = useStylesRoot();

  const handleClick = () => {
    requestAccount(setError, setUserId);
  };

  const handleBuy = ({ bookId, price }) => {
    buyBookNft(contract, bookId, price);
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <div className={root}>
        <div className={explore}>
          <Typography variant="h1">Explore</Typography>
          <div className={wrapper}>
            {books?.length ? (
              books.slice(0, 5).map((book, key) => {
                // console.log(
                //   "price",
                //   Web3.utils.fromWei(Number(book.price).toString(), "ether")
                // );
                return (
                  <div className={bookWrapper}>
                    <BookNFT book={book} />
                    <Button
                      variant="outlined"
                      size="small"
                      className={button}
                      onClick={() =>
                        handleBuy({ bookId: book.tokenId, price: book.price })
                      }
                    >
                      Buy
                    </Button>
                  </div>
                );
              })
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
      </div>
    </>
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
  bookWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    // border: "solid 1px",
  },
  button: {
    border: "2px solid",
    borderRadius: "9999px",
    width: "150px",
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
