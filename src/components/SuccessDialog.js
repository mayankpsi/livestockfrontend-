import React from "react";
import { Grid, Button } from "@mui/material";

import Back from "../assets/images/successBack.png";
import Gif from "../assets/images/check.gif";

const SuccessDialog = () => {
  return (
    <>
      <Grid
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          // border: "1px solid red",
          backgroundColor: "rgba(0, 0, 0, 0.24)",
        }}
      >
        <Grid sx={{ position: "relative" }}>
          <img src={Back} alt="success " style={{ height: "40rem" }} />
          <img
            src={Gif}
            alt="success"
            style={{
              height: "90px ",
              position: "absolute",
              // top: "440px",
              top: "21%",
              left: "50%",
              translate: "-50%",
              borderRadius: "50%",
            }}
          />
        </Grid>
        <Button
          className="d_bgcolor white_color fs18px p_l-r13-60px bRadius_8 bold "
          // onClick={() => navigate(`/order/${id}`)}
        >
          Continue
        </Button>
      </Grid>
    </>
  );
};

export default SuccessDialog;
