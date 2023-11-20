import { useState } from "react";
import { AddCircleOutlineOutlinedIcon } from "../icons";
import { Box } from "@mui/material";

const ImageUpload = ({onUpload}) => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    onUpload(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        border: "1px solid #8F8F8F",
        minHeight: "30vh",
        m: 2,
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <AddCircleOutlineOutlinedIcon sx={{ color: "#8F8F8F", fontSize: 150 }} />
      <input
        id="upload-image"
        accept="image/*"
        type="file"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          cursor: "pointer",
          opacity: 0,
        }}
        onChange={handleFileUpload}
      />
      {imageUrl && <img src={imageUrl} alt="Uploaded Image" height="300" />}
    </Box>
  );
};

export default ImageUpload;
