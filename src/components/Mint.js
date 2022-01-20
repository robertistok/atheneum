import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { NFTStorage } from "nft.storage";

import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";

const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgxZjQ2MDIwMzg4Q0ZBYTdlQTc1MkNCNWFCQjc2ZmZEZTNFZDZDRUIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MjUyMTE5NzU2NywibmFtZSI6IkF0aGVuYWV1bSJ9.tK6sT_zmbTITfpgz74uXwuPGalCc796V28KsDc5Xi34",
});

const Root = styled("form")({
  display: "flex",
  flexDirection: "column",
});

const StyledFormControl = styled(FormControl)({
  margin: "16px auto",
});

const Mint = () => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    coverFile: { name: "" },
    bookFile: { name: "" },
    quantity: "",
    priceInEth: "",
  });

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
    setLoading(false);
    console.log(metadata.url);
  };

  return (
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
        {loading ? "Minting in progress" : "Upload and mint"}
      </Button>
    </Root>
  );
};

export default Mint;
