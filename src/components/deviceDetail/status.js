import React from "react";
import { Grid, Typography } from "@mui/material";
import { BiWifi } from "react-icons/bi";
const Status = () => {
  return (
    <>
      <Grid
        container
        style={{
          columnGap: "10px",
        }}
        className="flexDir mb20px"
      >
        <Typography className=" fs20px mb20px  fontWeight700">
          Status
        </Typography>

        <Grid
          container
          justifyContent="flex-start"
          sx={{ height: "4rem", columnGap: "2rem" }}
        >
          <Grid
            item
            xs={5.6}
            sm={5.8}
            md={4}
            lg={4}
            className="IntBorder  fs18px flex spaceBetween bRadius_8 p_l-r10px"
            sx={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-between",
            }}
          >
            <Typography className="fs16px g_color fontWeight700 ">
              Power
            </Typography>
            <Typography className="fs16px d_color fontWeight700 ">
              ONLINE
            </Typography>
          </Grid>
          <Grid
            item
            xs={5.6}
            sm={5.8}
            md={4}
            lg={4}
            className="IntBorder  fs18px flex spaceBetween bRadius_8 p_l-r10px"
          >
            <Typography className="fs16px g_color fontWeight700 ">
              {" "}
              Wi-fi Strength
            </Typography>
            <BiWifi className="fs20px y_color fontWeight700 " />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Status;
