import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import Add from "../.././assets/images/AddSite.png";

const Index = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [siteDetails, setSiteDetails] = useState([
    {
      id: 1,
      siteName: "gdhsgadh",
      bmName: "gdhsgadh",
      deviceName: 1,
      alert: 4,
    },
    {
      id: 1,
      siteName: "gdhsgadh",
      bmName: "gdhsgadh",
      deviceName: 1,
      alert: 4,
    },
  ]);
  return (
    <>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        // sx={{ border: "1px solid black" }}
        className=" d_bgcolor fs16px white_color  p_t-b10px bRadius_8-2 "
      >
        <Grid
          container
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          // sx={{ border: "1px solid red" }}
        >
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Typography className="  fs16px  p_l-r10px fontWeight700">
              UID{" "}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Typography className="fs16px fontWeight700">Site Name </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={8}
          sm={8}
          md={8}
          lg={8}
          justifyContent="flex-end"
          alignItems="flex-end"
          // sx={{ border: "1px solid blue", display: "flex" }}
          className="flex flex-end"
        >
          <Grid item xs={3} sm={3} md={3} lg={3} className="flex flexEnd">
            <Typography className="  fs16px fontWeight700  ">
              Branch Manager{" "}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} className="flex flexEnd">
            <Typography className="  fs16px fontWeight700  ">
              Device{" "}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} className="flex flexEnd">
            <Typography className="fs16px fontWeight700">Alerts</Typography>
          </Grid>
          <Grid item xs={5} sm={5} md={5} lg={5} className="flex centerJc">
            <Typography className="fs16px p_r10px fontWeight700 ">
              Action
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {siteDetails && siteDetails.length > 0 ? (
        siteDetails.map((a, i) => (
          <Grid
            key={i}
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            // sx={{ border: "1px solid black" }}
            className="  fs16px  border  p_t-b10px "
          >
            <Grid
              container
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              // sx={{ border: "1px solid red" }}
            >
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Typography className="  fs16px  p_l-r10px fontWeight700 d_color">
                  {a.id}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Typography className="fs16px fontWeight700 d_color">
                  {a.siteName}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={8}
              sm={8}
              md={8}
              lg={8}
              justifyContent="flex-end"
              alignItems="flex-end"
              // sx={{ border: "1px solid blue", display: "flex" }}
              className="flex flex-end"
            >
              <Grid item xs={3} sm={3} md={3} lg={3} className="flex flexEnd">
                <Typography className="  fs16px fontWeight700  ">
                  Branch Manager{" "}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} className="flex flexEnd">
                <Typography className="  fs16px fontWeight700  ">
                  {a.deviceName}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} className="flex flexEnd">
                <Typography className="fs16px fontWeight700 Red_color">
                  {a.alert}
                </Typography>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5} className="flex center">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <MdOutlineRemoveRedEye
                    className="fs24px"
                    onClick={() => navigate(`/admin/site-management/${a.id}`)}
                  />

                  <MdDeleteOutline className="fs24px" />
                </Stack>
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
          className=" border "
        >
          <Grid
            container
            item
            alignItems="center"
            sx={{ flexDirection: "column", width: "20%" }}
            className="Greenborder  bRadius_8 Cursor"
            onClick={() => {
              navigate("/admin/site-management/add-site-management");
            }}
          >
            <img src={Add} alt="loading" className="M20" />
            <Typography className="fs18px mt10px d_color fontWeight700 mb10px">
              Add Site
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Index;
