import React from "react";
import {
  Grid,
  Typography,
  Stack,
} from "@mui/material";

const DashboardCard = ({ title, total, img }) => {
  return (
    <Stack
      direction="row"
      borderRadius="10px"
      alignItems='center'
      justifyContent="space-between"
      flexGrow={1}
      p="20px"
      sx={{
        boxShadow:
          "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
          background:'#fff',
      }}
    >
      <Grid
        container
        item
        xs={8}
        sm={8}
        md={8}
        lg={8}
        className="txtDiv"
      >
        <Grid item className="flexDir">
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#696969",
            }}
          >
            {title}
          </Typography>
          <Typography className="CardText b1c_color fs24px fontWeight700">
            {total}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        sx={{
          borderRadius: "100%",
          width: "70px",
          height: "70px",
          background: "#B58B5D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={img} style={{ width: "24px", height: "24px" }} alt="error" />
      </Grid>
    </Stack>
  );
};

export default DashboardCard;
