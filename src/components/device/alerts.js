import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { BiWifi } from "react-icons/bi";
import Img from "../.././assets/images/Dummy.png";
const Status = ({ data }) => {
  const [statusData, setStatusData] = useState();
  // const [isOnline, setIsOnline] = useState(navigator.onLine);
  // const handleOnline = () => {
  //   setIsOnline(true);
  // };
  // const handleOffline = () => {
  //   setIsOnline(false);
  // };

  useEffect(() => {
    console.log("dataStatus", data);
    setStatusData(data[0]);
  }, []);
  // useEffect(() => {
  //   window.addEventListener("online", handleOnline);
  //   window.addEventListener("offline", handleOffline);
  //   return () => {
  //     window.removeEventListener("online", handleOnline);
  //     window.removeEventListener("offline", handleOffline);
  //   };
  // }, []);
  return (
    <>
      <Grid container className="flex ">
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6.5}
          lg={6.5}
          className=" flex m_r20px "
          sx={{ justifyContent: "space-between" }}
        >
          <Grid item xs={6} sm={6} md={5} lg={5} className="center">
            <img src={Img} alt="loading" className="statusImg" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            className=" flexDir  Width100 "
            sx={{ rowGap: "2rem" }}
          >
            <Grid item className="flex spaceBetween">
              <Typography className="fs20px g_color fontWeight700 ">
                {" "}
                Device Name
              </Typography>
              <Typography className="fs20px  fontWeight700">
                {statusData?.nodeName}
              </Typography>
            </Grid>
            <Grid
              item
              className="flex spaceBetween"
              // style={{ border: "1px solid red" }}
            >
              <Typography className="fs20px  g_color fontWeight700 ">
                Device UID
              </Typography>
              <Typography className="fs20px fontWeight700 ">
                {statusData?.nodeID}
              </Typography>
            </Grid>
            <Grid item className="flex spaceBetween ">
              <Typography className="fs20px  g_color fontWeight700">
                Temperature
              </Typography>
              <Typography
                className="fs20px fontWeight700 Red_color p_r70px"
                align="left"
              >
                56'f
              </Typography>
            </Grid>
            <Grid
              item
              className="flex spaceBetween"
              // style={{ border: "1px solid red" }}
            >
              <Typography className="fs20px g_color fontWeight700 ">
                {" "}
                Humidity
              </Typography>
              <Typography className="fs20px fontWeight700 p_r70px">
                80%
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          className="flex  AlignStart p_l50px mt5px"
          sx={{
            rowGap: "2rem",
            columnGap: "1rem",
            borderLeft: "1px solid #ddd",
          }}
        >
          <Typography className="fs20px fontWeight700 Width100 ">
            Status
          </Typography>
          <Grid
            item
            xs={5.8}
            sm={5.8}
            md={8}
            lg={8}
            className="IntBorder  fs18px flex spaceBetween bRadius_8 p30px Width100 Input_bgcolor"
          >
            <Typography className="fs16px g_color fontWeight700 ">
              Power
            </Typography>
            <Typography className="fs16px d_color fontWeight700 Transform_Capital">
              {statusData ? statusData.isOnline : "Offline"}
            </Typography>
          </Grid>

          <Grid
            item
            xs={5.8}
            sm={5.8}
            md={8}
            lg={8}
            className="IntBorder   fs18px flex spaceBetween bRadius_8 p30px  Input_bgcolor "
          >
            <Typography className="fs16px g_color fontWeight700 ">
              {" "}
              Wifi Strength
            </Typography>
            <BiWifi className="fs20px y_color fontWeight700 " />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Status;
