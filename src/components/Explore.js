import React from "react";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth } from "./Layout";
import { requestAccount } from "./Main";
import { purpleDark } from "../styles/colors";

const subjects = ["business", "love", "science_fiction", "autobiographies"];
const url = (subject) =>
  `https://openlibrary.org/subjects/${subject}.json?ebooks=true&limit=15&details=false`;

export const Explore = () => {
  const [books, setBooks] = React.useState({});
  const [category, setCategory] = React.useState(subjects[0]);
  const [loading, setLoading] = React.useState(false);
  const { userId, setError, setUserId } = useAuth();
  React.useEffect(() => {
    setLoading(true);
    const fetchBooks = async () =>
      await fetch(url(category))
        .then((response) => response.json())
        .then(({ name, works }) => {
          const booksWithCover = works.filter((work) => work.cover_id !== null);
          setBooks({ subject: name, works: booksWithCover });
          setLoading(false);
        });
    fetchBooks();
  }, [category]);
  const { works } = books;
  const { root, explore, wrapper, bookDiv, title, filter, connect, button } =
    useStylesRoot();
  console.log("id", userId);

  const handleClick = () => {
    requestAccount(setError, setUserId);
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <div className={root}>
        <div className={explore}>
          <Typography variant="h1">Explore</Typography>
          <div className={filter}>
            {subjects.map((subject) => (
              <Chip
                key={subject}
                label={subject}
                variant={category === subject ? "contained" : "outlined"}
                color="secondary"
                sx={{ marginRight: "20px" }}
                onClick={() => {
                  setCategory(subject);
                }}
              />
            ))}
          </div>
          <div className={wrapper}>
            {works?.length ? (
              works.slice(0, 5).map((book) => {
                return (
                  <div className={bookDiv} key={book.key}>
                    <Cover
                      url={`url(https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg)`}
                    ></Cover>
                    <Typography variant="h4" className={title}>
                      {book.title}
                    </Typography>
                    <Button variant="outlined" size="small" className={button}>
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
        <div className={root}>
          <Typography variant="h1">My Books</Typography>
          {userId ? (
            <div>Your books</div>
          ) : (
            <Button
              onClick={handleClick}
              variant="outlined"
              className={connect}
            >
              Connect your wallet to view your books
            </Button>
          )}
          <Divider />
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
  filter: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
    marginBottom: "20px",
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
