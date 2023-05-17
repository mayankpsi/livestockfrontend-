import React, { useState } from "react";
import { Grid, Typography, InputBase, Button } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";
const Security = () => {
  const [changepass, setChangepass] = useState(true);
  const buttonSwitch = styled(Button)(({ theme }) => ({
    "& .MuiButtonBase-root.": {
      color: green[600],
      "&:hover": {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
    },
    "& MuiButtonBase-root": {
      backgroundColor: grey[600],
    },
  }));
  return (
    <>
      <Grid container>
        <Grid container>
          <Typography className="fs24px  fontWeight700  mb20px">
            Security
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          {changepass ? (
            <>
              <Grid
                container
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className="flexDir"
                sx={{ rowGap: "2rem" }}
              >
                <Typography className=" fs18px g_color  fontWeight700">
                  Password
                </Typography>
                <InputBase
                  type="password"
                  //   readOnly={true}
                  //   value={gatewayPincode}
                  //   onChange={(e) => setGatewayPincode(e.target.value)}
                  className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
                />

                <Grid container itemxs={4} sm={4} md={4} lg={4}>
                  {" "}
                  <Button
                    className="d_color fs16px fontWeight500  Transform_Capital  p_l-r10-30px  mt20px Greenborder1"
                    // style={{ border: "1px solid #347d00 " }}
                    onClick={() => {
                      setChangepass(false);
                    }}
                  >
                    update
                  </Button>
                </Grid>

                {/* <Button varients="Outlined">update</Button> */}
              </Grid>
            </>
          ) : (
            <>
              <Grid container className="flex spaceBetween">
                <Grid item xs={5} sm={5} md={5} lg={5}>
                  <Typography className=" fs18px g_color  fontWeight700">
                    Create New Password
                  </Typography>
                  <InputBase
                    type="password"
                    // readOnly={true}
                    //   value={gatewayPincode}
                    //   onChange={(e) => setGatewayPincode(e.target.value)}
                    className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
                  />
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={5}
                  md={5}
                  lg={5}
                  className=" flexStart p_r30px"
                >
                  {" "}
                  <Typography className=" fs18px g_color  fontWeight700">
                    Confirm Password
                  </Typography>
                  <InputBase
                    type="password"
                    // readOnly={true}
                    //   value={gatewayPincode}
                    //   onChange={(e) => setGatewayPincode(e.target.value)}
                    className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
                  />{" "}
                </Grid>
              </Grid>
              <Grid container>
                <Button className="d_color fs16px fontWeight500  Transform_Capital  p_l-r10-30px  mt20px Greenborder1 ">
                  save
                </Button>

                <Button
                  className="d_color fs16px fontWeight500  Transform_Capital  p_l-r10-30px  mt20px ml20px Greenborder1"
                  onClick={() => {
                    setChangepass(true);
                  }}
                >
                  cancel
                </Button>
              </Grid>
            </>
          )}
          {/* </Grid> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Security;
