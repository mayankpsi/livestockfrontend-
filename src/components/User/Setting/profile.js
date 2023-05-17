import React from "react";
import { Grid, Typography, InputBase } from "@mui/material";
const Profile = () => {
  return (
    <>
      <Grid container>
        <Grid container>
          <Typography className="fs24px  fontWeight700  mb20px">
            Personal Details{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Grid
            container
            item
            xs={12}
            sm={8}
            md={10}
            lg={10}
            className="flexDir"
            sx={{ rowGap: "2rem" }}
          >
            <Typography className=" fs18px g_color  fontWeight700">
              UID
            </Typography>
            <InputBase
              readOnly={true}
              //   value={gatewayPincode}
              //   onChange={(e) => setGatewayPincode(e.target.value)}
              className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
            />
            <Typography className=" fs18px g_color  fontWeight700">
              Email
            </Typography>
            <InputBase
              readOnly={true}
              //   value={gatewayPincode}
              //   onChange={(e) => setGatewayPincode(e.target.value)}
              className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Grid
            container
            item
            xs={12}
            sm={8}
            md={10}
            lg={10}
            className="flexDir"
            sx={{ rowGap: "2rem" }}
          >
            <Typography className=" fs18px g_color  fontWeight700">
              Name
            </Typography>
            <InputBase
              readOnly={true}
              //   value={gatewayPincode}
              //   onChange={(e) => setGatewayPincode(e.target.value)}
              className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
            />
            <Typography className=" fs18px g_color  fontWeight700">
              Mobile Number
            </Typography>
            <InputBase
              readOnly={true}
              //   value={gatewayPincode}
              //   onChange={(e) => setGatewayPincode(e.target.value)}
              className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
