import React from "react";
import {
  Container,
  Grid,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

const DashboardCard = ({ title, total, img }) => {
  return (
    <Grid item xs={4} sm={5.7} md={2.8} lg={2.8} className="dashboardCard">
      <Grid
        container
        item
        xs={8}
        sm={8}
        md={8}
        lg={8}
        className="txtDiv p_l-r10px"
        // sx={{ border: "1px solid brown" }}
      >
        <Grid item className="flexDir">
          <Typography className="CardText fs16px fontWeight700">
            {title && title}
          </Typography>
          <Typography className="CardText b1c_color fs24px fontWeight700">
            {total && total}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={3} sm={3} md={3} lg={3} className="imageDiv">
        <img src={img} style={{ width: "32px", height: "32px" }} alt="error" />
      </Grid>
    </Grid>
  );
};

export default DashboardCard;
