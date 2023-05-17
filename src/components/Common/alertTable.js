import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import NoData from "../.././assets/images/NoAlert.png";

const Index = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [siteDetails, setSiteDetails] = useState([
    {
      id: 1,
      siteName: "soil is too dry -time to water",
      date: "12/3/22",
      time: "3",
      sensor: "moisture sensor",
    },
  ]);
  return (
    <>
      <Grid container>
        <Typography className="fs24px b1c_color mb10px"> Alerts </Typography>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          // sx={{ border: "1px solid black" }}
          className=" d_bgcolor fs16px white_color  p_t-b10px "
        >
          <Grid container item xs={4} sm={4} md={3} lg={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography className="fs16px fontWeight700  p_l-r10px">
                Alert Name
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={8}
            sm={8}
            md={9}
            lg={9}
            justifyContent="flex-end"
            alignItems="flex-end"
            className="flex flex-end"
          >
            <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
              <Typography className="  fs16px fontWeight700   ">
                Date
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
              <Typography className="  fs16px fontWeight700  ">Time</Typography>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} className="flex center">
              <Typography className="fs16px fontWeight700">
                Sensor Name
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
              <Typography className="fs16px p_r10px fontWeight700 ">
                Action
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {siteDetails && siteDetails.length > 0 ? (
          siteDetails.map((a, i) => (
            <Grid
              container
              item
              key={i}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              // sx={{ border: "1px solid black" }}
              className="  fs16px   p_t-b10px  border "
            >
              <Grid container item xs={4} sm={4} md={3} lg={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography className="  fs16px  p_l-r10px fontWeight700 Transform_Capital">
                    {a.siteName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={8}
                sm={8}
                md={9}
                lg={9}
                justifyContent="flex-end"
                alignItems="flex-end"
                className="flex flex-end"
              >
                <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
                  <Typography className="  fs16px fontWeight700   ">
                    {a.date}
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
                  <Typography className="  fs16px fontWeight700  ">
                    {a.time}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} className="flex center">
                  <Typography className="fs16px fontWeight700 Transform_Capital">
                    {a.sensor}
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
                  <MdDeleteOutline className="fs24px center " />
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: "400px" }}
          >
            <Grid
              container
              item
              alignItems="center"
              sx={{ flexDirection: "column" }}
            >
              <img src={NoData} alt="loading" height="200px" />
              <Typography className="fs20px mt10px d_color fontWeight700 ">
                No Data Found
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Index;
