import React from "react";
import { Container, Grid } from "@mui/material";

import HeaderAdmin from "../components/Header/adminHeader";
import Loader from "../components/loader";

import { useLoaderController, setLoader } from "../context/common";

const AdminUIContainer = ({ children }) => {
  const [controller, dispatch] = useLoaderController();
  const { loading } = controller;
  return (
    <>
      <Grid sx={{ marginBottom: "20px" }}>
        {loading && <Loader />}
        <Grid
          sx={{
            padding: "15px 0",
            position: "sticky",
            top: "0px",
            backgroundColor: "white",
            zIndex: 999,
            // border: "1px solid red",
            boxShadow: "0px 5px 5px -7px black",
          }}
        >
          <Container maxWidth="lg">
            <HeaderAdmin />
          </Container>
        </Grid>
        {children}
      </Grid>
    </>
  );
};

export default AdminUIContainer;
