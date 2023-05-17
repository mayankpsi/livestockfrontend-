import React from "react";
import { Container, Grid, InputBase, Menu, MenuItem } from "@mui/material";

import Header from "../components/Header";
import Loader from "../components/loader";

import { useLoaderController, setLoader } from "../context/common";

const AdminUI = ({ children }) => {
  const [controller, dispatch] = useLoaderController();
  const { loading } = controller;

  return (
    <Grid>
      {loading && <Loader />}
      <Grid
        sx={{
          padding: "10px 0",
          position: "sticky",
          top: "0px",
          backgroundColor: "white",
          zIndex: 999,
          // border: "1px solid red",
          boxShadow: "0px 5px 5px -7px black",
        }}
      >
        <Container maxWidth="lg" sx={{ padding: "15px 0" }}>
          <Header />
        </Container>
      </Grid>

      {children}
    </Grid>
  );
};

export default AdminUI;
