import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { NFTStorage } from "nft.storage";
import { useAuth } from "./Layout";
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

import { mintBookNft } from "../utils/common";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgxZjQ2MDIwMzg4Q0ZBYTdlQTc1MkNCNWFCQjc2ZmZEZTNFZDZDRUIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MjUyMTE5NzU2NywibmFtZSI6IkF0aGVuYWV1bSJ9.tK6sT_zmbTITfpgz74uXwuPGalCc796V28KsDc5Xi34",
});

const initialState = {
  title: "",
  description: "",
  coverFile: { name: "" },
  bookFile: { name: "" },
  quantity: "",
  priceInEth: "",
};

const Mint = ({ contract, provider }) => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const { userId } = useAuth();

  const handleInputChange = (e) => {
    setFormState((state) => ({
      ...state,
      [e.target.name]:
        e.target.files?.length > 0 ? e.target.files[0] : e.target.value,
    }));
  };

  const handleUploadAndMint = async (e) => {
    e.preventDefault();
    setLoading(true);
    const metadata = await client.store({
      name: formState.title,
      description: formState.description,
      image: formState.coverFile,
      properties: { bookFile: formState.bookFile },
    });
    // setLoading(false);
    const url = metadata.url.split("//");
    const URI = `https://ipfs.io/ipfs/${url[1]}`;
    mintBookNft({
      contract,
      quantity: formState.quantity,
      URI,
      price: formState.priceInEth,
      resetState: () => setFormState(initialState),
      setLoading: setLoading,
    });
  };

  return userId ? (
    <Root onSubmit={handleUploadAndMint}>
      <Typography variant="h3" style={{ textAlign: "center", marginBottom: 8 }}>
        Mint a book
      </Typography>
      <StyledFormControl fullWidth>
        <InputLabel shrink htmlFor="title">
          Title
        </InputLabel>
        <Input
          onChange={handleInputChange}
          id="title"
          name="title"
          required
          value={formState.title}
          aria-describedby="title-helper-text"
        />
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <InputLabel shrink htmlFor="description">
          Description
        </InputLabel>
        <Input
          id="description"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
          required
          aria-describedby="description-helper-text"
          multiline
        />
      </StyledFormControl>

      <StyledFormControl fullWidth>
        <InputLabel shrink htmlFor="coverFile">
          Cover image
        </InputLabel>
        <Input
          id="coverFile"
          name="coverFile"
          onChange={handleInputChange}
          required
          aria-describedby="cover-helper-text"
          type="file"
        />
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <InputLabel shrink htmlFor="bookFile">
          Book
        </InputLabel>
        <Input
          id="bookFile"
          name="bookFile"
          onChange={handleInputChange}
          required
          aria-describedby="book-helper-text"
          type="file"
        />
        <FormHelperText id="book-helper-text">PDF/Mobi/Epub</FormHelperText>
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <InputLabel shrink htmlFor="quantity">
          Quantity
        </InputLabel>
        <Input
          id="quantity"
          name="quantity"
          value={formState.quantity}
          required
          onChange={handleInputChange}
          aria-describedby="quantity-helper-text"
          type="number"
        />
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <InputLabel shrink htmlFor="cover">
          Price in ETH
        </InputLabel>
        <Input
          id="priceInEth"
          name="priceInEth"
          value={formState.priceInEth}
          required
          onChange={handleInputChange}
          aria-describedby="cover-helper-text"
          type="number"
        />
      </StyledFormControl>
      <Button disabled={loading} type="submit" variant="contained">
        <CircularProgress size={20} />
        {loading ? (
          <>
            <span>Minting in progress </span>
            <CircularProgress size="small" />
          </>
        ) : (
          "Upload and mint"
        )}
      </Button>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Root>
  ) : (
    <Typography variant="body1">Please connect your wallet first!</Typography>
  );
};

const Root = styled("form")({
  display: "flex",
  flexDirection: "column",
});

const StyledFormControl = styled(FormControl)({
  margin: "16px auto",
});

export default Mint;
