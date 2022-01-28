import React from "react";
import { ethers } from "ethers";
import { CircularProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { buyBookNft } from "../utils/common";
import addressJson from "../abis/MintBook_address.json";

import { Book } from "./Book";

export const Explore = ({ contract }) => {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  const fetchBooks = async () => {
    try {
      if (!contract) {
        return;
      }

      setLoading(true);
      const counter = await contract.bookIds();
      const counterInt = parseInt(counter._hex, 16);

      const allBooks = await Promise.all(
        Array(counterInt)
          .fill()
          .map(async (_, index) => {
            const tokenId = index;
            // const ownerOf = await contract.ownerOf(tokenId);
            const book = await contract.books(tokenId);
            const numberOfBooks = (
              await contract.balanceOf(addressJson.address, tokenId)
            ).toString();

            try {
              const response = await (await fetch(book.URI)).json();
              const { name, description, properties, image } = response;

              const bookFileUrl = properties.bookFile.split("//");
              const coverUrl = image.split("//");
              return {
                price: book.price,
                priceEth: ethers.utils.formatEther(book.price.toString()),
                tokenId,
                imageUrl: `https://ipfs.io/ipfs/${coverUrl[1]}`,
                bookFile: `https://ipfs.io/ipfs/${bookFileUrl[1]}`,
                name,
                description,
                numberOfBooks,
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

  const { root, explore, wrapper } = useStylesRoot();

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
            {books.length === 0 && !loading ? (
              <Typography variant="body1">Books coming soon</Typography>
            ) : (
              <div className={wrapper}>
                {books?.length ? (
                  books.map((book) => (
                    <Book
                      key={book.tokenId}
                      handleBuy={handleBuy}
                      book={book}
                      download={false}
                      type="market"
                    />
                  ))
                ) : (
                  <CircularProgress />
                )}
              </div>
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
    justifyContent: "flex-start",
    margin: "30px 0",
    "@media (max-width:768px)": {
      justifyContent: "center",
    },
  },
}));
