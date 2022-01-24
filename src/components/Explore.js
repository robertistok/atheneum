import React from "react";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { buyBookNft } from "../utils/common";
import { useAuth } from "./Layout";
import { requestAccount } from "./Main";
import { MyBooks } from "./MyBooks";
import { purpleDark } from "../styles/colors";

export const Explore = ({ contract }) => {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { userId, setError, setUserId } = useAuth();

  React.useEffect(() => {
    fetchBooks();
  }, []);
  console.log("contract", contract);

  const fetchBooks = async () => {
    try {
      if (!contract) {
        return;
      }

      const counter = await contract.bookIds();
      const counterInt = parseInt(counter._hex, 16);
      console.log("token id", counterInt, counter);

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
              console.log("response", response);
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

  const { root, explore, wrapper, bookDiv, title, connect, button } =
    useStylesRoot();

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
                return (
                  <div className={bookDiv} key={key}>
                    <Cover url={book.imageUrl}></Cover>
                    <img src={book.imageUrl} />
                    <Typography variant="h4" className={title}>
                      {book.title}
                    </Typography>
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
    overflow: "hidden",
    position: "relative",
    backgroundImage: (props) => props.url,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
  },
});

const Cover = ({ children, ...props }) => {
  const { cover } = useStyles(props);
  return <div className={cover}>{children}</div>;
};
