import React from "react";
import { Button, Chip, CircularProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const subjects = ["business", "love", "fantasy", "autobiographies"];
const url = (subject) =>
  `https://openlibrary.org/subjects/${subject}.json?ebooks=true&limit=15&details=false`;

export const Explore = () => {
  const [books, setBooks] = React.useState({});
  const [category, setCategory] = React.useState(subjects[0]);
  const [loading, setLoading] = React.useState(false);

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
  const { root, explore, wrapper, bookDiv, title, filter } = useStylesRoot();

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
                    <Button variant="outlined" size="small">
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
        </div>
      </div>
    </>
  );
};

const useStylesRoot = makeStyles({
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
    alignItems: "center",
    marginTop: "30px",
    marginBottom: "30px",
  },
  bookDiv: {
    display: "flex",
    flexDirection: "column",
    marginRight: "40px",
  },
  title: {
    wordWrap: "break-word",
    maxWidth: "170px",
  },
  filter: {
    display: "flex",
    flexDirection: "row",
    marginTop: "30px",
    marginBottom: "30px",
  },
});

const useStyles = makeStyles({
  cover: {
    height: "200px",
    width: "180px",
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
    backgroundImage: (props) => props.url,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "50% 50%",
  },
});

const Cover = ({ children, ...props }) => {
  const { cover } = useStyles(props);
  return <div className={cover}>{children}</div>;
};
