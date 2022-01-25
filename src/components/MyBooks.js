import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth } from "./Layout";

import { Book } from "./Book";

export const MyBooks = ({ contract }) => {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { userId } = useAuth();

  React.useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBooks = async () => {
    try {
      if (!contract) {
        return;
      }

      const booksIds = userId ? await contract.getIds(userId) : [];
      setLoading(true);

      const allBooks = await Promise.all(
        booksIds.map(async (id) => {
          const tokenId = id;
          const tokenURI = await contract.tokenURI(tokenId);
          try {
            const response = await (await fetch(tokenURI)).json();
            const { name, description, properties, image } = response;

            const bookFileUrl = properties.bookFile.split("//");
            const coverUrl = image.split("//");
            return {
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

  const { root, explore, wrapper } = useStylesRoot();

  if (loading) return <CircularProgress />;

  return (
    <>
      <div className={root}>
        <div className={explore}>
          <Typography variant="h1">MyBooks</Typography>
          {books.length === 0 && !loading ? (
            <p>no books</p>
          ) : (
            <div className={wrapper}>
              {books?.length ? (
                books
                  .slice(0, 5)
                  .map((book) => <Book book={book} key={book.tokenId} />)
              ) : (
                <CircularProgress />
              )}
            </div>
          )}
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
    alignItems: "space-between",
    justifyContent: "space-between",
    margin: "30px 0",
  },
}));
