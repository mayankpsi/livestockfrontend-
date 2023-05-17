import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  InputBase,
  Divider,
  FormControl,
  TextField,
  MenuItem,
} from "@mui/material";

import {
  useAddBmController,
  setBranchId,
  setBranchName,
  setBranchDepth1,
  setBranchDepth2,
  setBranchDepth3,
  setBranchAddress,
  setBranchPincode,
  setBranchCity,
  setBranchState,
  setBranchCountry,
  setBranchGeoLatitude,
  setBranchGeoLongitude,
  setNodeData,
} from "../../../../../context/addBm";
import DetailMap from "../../../../../components/Common/detailMap";

const Overview = ({ title }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [controller, dispatch] = useAddBmController();

  const {
    branchId,
    branchName,
    branchDepth1,
    branchDepth2,
    branchDepth3,
    branchAddress,
    branchPincode,
    branchCity,
    branchState,
    branchCountry,
    branchGeoLongitude,
    branchGeoLatitude,
    nodeData,
  } = controller;
  const head1 = [
    { name: "UID" },
    { name: "Branch Manager Name" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "Device" },
    { name: "Alerts" },
    { name: "Action" },
  ];
  const [orderType, setOrderType] = useState();

  useEffect(() => {
    if (state?.address) {
      let add = state?.address;
      setBranchPincode(dispatch, add?.gatewayPincode);
      setBranchCity(dispatch, add?.gatewayCity);
      setBranchState(dispatch, add?.gatewayState);
      setBranchCountry(dispatch, add?.gatewayCountry);

      let newNode = [...nodeData];
      newNode.map((item) => {
        item.nodePincode = add?.gatewayPincode;
        item.nodeCity = add?.gatewayCity;
        item.nodeState = add?.gatewayState;
        item.nodeCountry = add?.gatewayCountry;
      });
    }
  }, [state]);
  return (
    <>
      <Container
        maxWidth="lg"
        // sx={{ border: "1px solid red" }}
        className="pl50px "
      >
        <Grid container className="">
          <Typography className=" fs20px mb20px bold">
            Enter Branch Manager Details{" "}
          </Typography>
          <Grid
            container
            className="flex spaceBetween "
            sx={{ rowGap: "2rem" }}
          >
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              sx={{ columnGap: ".5rem" }}
            >
              <Grid
                container
                item
                xs={5.8}
                sm={5.8}
                md={5.6}
                lg={5.6}
                className=" flexDir"
              >
                <Typography className=" fs16px g_color  fontWeight500">
                  Branch manager ID
                </Typography>
                <InputBase
                  type="number"
                  className="IntBorder bRadius_8 fs14px"
                  value={branchId}
                  onChange={(e) => setBranchId(dispatch, e.target.value)}
                  required
                />
              </Grid>
              <Grid
                container
                item
                xs={5.8}
                sm={5.8}
                md={6}
                lg={6}
                className=" flexDir  Width100"
              >
                <Typography className=" fs16px g_color  fontWeight500">
                  Branch manager Name
                </Typography>
                <InputBase
                  className="IntBorder bRadius_8 fs14px"
                  value={branchName}
                  onChange={(e) => setBranchName(dispatch, e.target.value)}
                  required
                />
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              className="flex spaceBetween "
            >
              <Grid
                container
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className=" flexDir"
              >
                <Typography className=" fs16px g_color  fontWeight500">
                  Depth 1
                </Typography>
                {/* <FormControl
                  sx={{
                    minWidth: 40,
                    width: '80%',
                    height: '100% !important',
                  }}
                  className="Selectdropstyle fs14px"
                  size="small"
                >
                  <TextField
                    select
                    // InputProps={{ disableUnderline: true }}
                    className="Selectdropstyle-noborder analytics_dropDown "
                    labelid="demo-select-small"
                    id="demo-select-small"
                    // inputProps={{ "aria-label": "Without label" }}
                    value={branchDepth1}
                    defaultValue={0}
                    onChange={(e) => {
                      setOrderType(e.target.value);
                      setBranchDepth1(dispatch, e.target.value);
                    }}
                    required
                  >
                    <MenuItem
                      value={'6'}
                      className="Selectmenustyle"
                      disabled={
                        branchDepth2 == 6 || branchDepth3 == 6 ? true : false
                      }
                    >
                      <Typography className="Selectmenustyle fs16px  ">
                        6
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      value={'18'}
                      className="Selectmenustyle"
                      disabled={
                        branchDepth2 == 8 || branchDepth3 == 8 ? true : false
                      }
                    >
                      <Typography className="Selectmenustyle fs16px  ">
                        18
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      value={'26'}
                      className="Selectmenustyle"
                      disabled={
                        branchDepth2 == 26 || branchDepth3 == 26 ? true : false
                      }
                    >
                      <Typography className="Selectmenustyle fs16px  ">
                        26
                      </Typography>
                    </MenuItem>
                  </TextField>
                </FormControl> */}
                <InputBase
                  type="number"
                  className="IntBorder bRadius_8 fs14px"
                  value={branchDepth1}
                  onChange={(e) => setBranchDepth1(dispatch, e.target.value)}
                  required
                />
              </Grid>
              <Grid
                container
                xs={3}
                sm={3}
                md={3}
                lg={3}
                item
                className=" flexDir"
              >
                <Typography className=" fs16px g_color  fontWeight500">
                  Depth 2
                </Typography>
                {/* <FormControl
                  sx={{
                    minWidth: 40,
                    width: "80%",
                  }}
                  className="Selectdropstyle fs14px"
                  size="small"
                >
                  <TextField
                    select
                    // InputProps={{ disableUnderline: true }}
                    className="Selectdropstyle-noborder analytics_dropDown "
                    labelid="demo-select-small"
                    id="demo-select-small"
                    // inputProps={{ "aria-label": "Without label" }}
                    value={branchDepth2}
                    defaultValue={0}
                    onChange={(e) => {
                      setOrderType(e.target.value);
                      setBranchDepth2(dispatch, e.target.value);
                    }}
                    required
                  >
                    <MenuItem
                      value={"6"}
                      className="Selectmenustyle"
                      disabled={
                        branchDepth1 == 6 || branchDepth3 == 6 ? true : false
                      }
                    >
                      <Typography className="Selectmenustyle fs16px  ">
                        6
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      value={"18"}
                      className="Selectmenustyle"
                      disabled={
                        branchDepth1 == 18 || branchDepth3 == 18 ? true : false
                      }
                    >
                      <Typography className="Selectmenustyle fs16px  ">
                        18
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      value={"26"}
                      className="Selectmenustyle"
                      disabled={
                        branchDepth1 == 26 || branchDepth3 == 26 ? true : false
                      }
                    >
                      <Typography className="Selectmenustyle fs16px  ">
                        26
                      </Typography>
                    </MenuItem>
                  </TextField>
                </FormControl> */}
                <InputBase
                  type="number"
                  className="IntBorder bRadius_8 fs14px"
                  value={branchDepth2}
                  onChange={(e) => setBranchDepth2(dispatch, e.target.value)}
                  required
                />
              </Grid>
              <Grid
                container
                xs={3}
                sm={3}
                md={3}
                lg={3}
                item
                className="flexDir"
              >
                <Typography className=" fs16px g_color  fontWeight500">
                  Depth 3
                </Typography>
                {/* <FormControl
                  sx={{
                    minWidth: 40,
                    width: "80%",
                  }}
                  className="Selectdropstyle fs14px"
                  size="small"
                >
                  <TextField
                    select
                    // InputProps={{ disableUnderline: true }}
                    className="Selectdropstyle-noborder analytics_dropDown "
                    labelid="demo-select-small"
                    id="demo-select-small"
                    // inputProps={{ "aria-label": "Without label" }}
                    value={branchDepth3}
                    defaultValue={0}
                    onChange={(e) => {
                      setOrderType(e.target.value);
                      setBranchDepth3(dispatch, e.target.value);
                    }}
                    required
                  >
                    <MenuItem
                      value={"6"}
                      className="Selectmenustyle"
                      disabled={
                        branchDepth1 == 6 || branchDepth2 == 6 ? true : false
                      }
                    >
                      <Typography className="Selectmenustyle fs16px  ">
                        6
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      value={"18"}
                      className="Selectmenustyle"
                      disabled={
                        branchDepth1 == 18 || branchDepth2 == 18 ? true : false
                      }
                    >
                      <Typography className="Selectmenustyle fs16px  ">
                        18
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      value={"26"}
                      className="Selectmenustyle"
                      disabled={
                        branchDepth1 == 26 || branchDepth2 == 26 ? true : false
                      }
                    >
                      <Typography className="Selectmenustyle fs16px  ">
                        26
                      </Typography>
                    </MenuItem>
                  </TextField>
                </FormControl> */}
                <InputBase
                  type="number"
                  className="IntBorder bRadius_8 fs14px"
                  value={branchDepth3}
                  onChange={(e) => setBranchDepth3(dispatch, e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Divider className="mt20px Width100 DividerDDD" />
      <Container
        maxWidth="lg"
        // sx={{ border: "1px solid red" }}
        className="pl50px "
      >
        <Grid
          container
          style={{
            flexDirection: "row",
            columnGap: "10px",
            // border: "1px solid red",
          }}
          className="spaceBetween1 mb20px flex"
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className="flexDir spaceBetween1 AlignStart bRadius_8-2 "
            >
              <Typography className=" fs20px mb20px bold  ">
                Enter Branch Manager Address
              </Typography>
              {/* <form style={{ border: "1px solid red" }}> */}
              <Grid
                container
                item
                md={12}
                sm={12}
                lg={12}
                className="p10px"
                sx={{
                  // border: "1px solid blue",
                  flexDirection: " column",
                  rowGap: "1rem",
                }}
              >
                <Typography className="fontWeight500 fs18px g_color  fontWeight500">
                  Full Address
                </Typography>
                <textarea
                  value={branchAddress}
                  onChange={(e) => setBranchAddress(dispatch, e.target.value)}
                  className="IntBorder  fontWeight500 fs16px   bRadius_8"
                  required
                />
              </Grid>
              <Grid
                container
                style={{
                  // border: "1px solid red",
                  rowGap: "1rem",
                }}
                className=" p10px flexDir"
              >
                <Grid
                  container
                  style={{
                    flexDirection: "row",
                    // border: "1px solid red",
                  }}
                  className=" flex spaceBetween1"
                >
                  <Grid item xs={12} sm={5} md={5}>
                    <Typography className=" fs18px g_color  fontWeight500">
                      Pincode
                    </Typography>
                    <InputBase
                      value={branchPincode}
                      onChange={(e) =>
                        setBranchPincode(dispatch, e.target.value)
                      }
                      required
                      className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <Typography className=" fs18px g_color  fontWeight500">
                      City
                    </Typography>
                    <InputBase
                      value={branchCity}
                      onChange={(e) => setBranchCity(dispatch, e.target.value)}
                      className="IntBorder fontWeight500  fs16px   bRadius_8 Width100 "
                      required
                      readOnly
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item xs={12} sm={5} md={5}>
                    <Typography className="fontWeight500  fs18px g_color  fontWeight500">
                      State
                    </Typography>
                    <InputBase
                      value={branchState}
                      onChange={(e) => setBranchState(dispatch, e.target.value)}
                      className=" bRadius_8  fontWeight500 IntBorder fs16px  Width100 "
                      required
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <Typography className="fs18px g_color  fontWeight500 ">
                      Country
                    </Typography>
                    <InputBase
                      value={branchCountry}
                      onChange={(e) =>
                        setBranchCountry(dispatch, e.target.value)
                      }
                      className="IntBorder  fs16px   bRadius_8 fs16px   fontWeight500 Width100"
                      required
                      readOnly
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* </form> */}
            </Grid>
          </Grid>

          <Grid
            item
            lg={5.8}
            md={5.8}
            sm={12}
            xs={12}
            sx={{ height: "320px ", overflow: "hidden" }}
          >
            <DetailMap
              updateLat={(e) => setBranchGeoLatitude(dispatch, e)}
              updateLng={(e) => setBranchGeoLongitude(dispatch, e)}
              changeable={true}
              update={(lat, lng) => console.log(lat, lng)}
            />
          </Grid>
        </Grid>

        <Divider className="Divider" />
      </Container>
    </>
  );
};

export default Overview;
