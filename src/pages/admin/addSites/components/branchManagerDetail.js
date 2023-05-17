import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  InputBase,
  Divider,
  FormControl,
  TextField,
  MenuItem,
} from '@mui/material';

import {
  useAddSiteController,
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
} from '../../../../context/addSite';

import DetailMap from '../../../../components/Common/detailMap';
// import BranchManager from "../../../../components/gatewayDetail/branchManager";

const BranchManager = ({ title }) => {
  const navigate = useNavigate();
  const [controller, dispatch] = useAddSiteController();

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
  } = controller;

  const head1 = [
    { name: 'UID' },
    { name: 'Branch Manager Name' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: 'Device' },
    { name: 'Alerts' },
    { name: 'Action' },
  ];
  const [orderType, setOrderType] = useState();
  return (
    <>
      <Container
        maxWidth="lg"
        // sx={{ border: "1px solid red" }}
        // className="pl50px "
      >
        <Grid container className=" ">
          <Typography className=" fs20px mb20px bold">
            Enter Branch Manager Details{' '}
          </Typography>
          <Grid
            container
            className="flex spaceBetween "
            sx={{
              columnGap: '1rem',
              rowGap: '2.5rem',
            }}
          >
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={5.8}
              lg={5.8}
              className="flex spaceBetween"
            >
              <Grid
                container
                item
                xs={4}
                sm={5}
                md={5.3}
                lg={5.3}
                className=" flexDir"
              >
                <Typography className=" fs18px g_color  fontWeight500">
                  Branch manager ID
                </Typography>
                <InputBase
                  type="number"
                  className="IntBorder bRadius_8 fs16px"
                  value={branchId}
                  onChange={(e) => {
                    if (e.target.value.length <= 8)
                      setBranchId(dispatch, e.target.value);
                  }}
                  required
                />
              </Grid>
              <Grid
                container
                item
                xs={3}
                sm={5}
                md={5.3}
                lg={5.3}
                className=" flexDir"
              >
                <Typography className=" fs18px g_color  fontWeight500">
                  Branch manager Name
                </Typography>
                <InputBase
                  className="IntBorder bRadius_8 fs16px"
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
              md={5.8}
              lg={5.8}
              className="flex spaceBetween"
            >
              <Grid
                container
                item
                xs={2}
                sm={3}
                md={3}
                lg={3}
                className=" flexDir"
              >
                <Typography className=" fs18px g_color  fontWeight500">
                  Depth 1
                </Typography>

                {/* <FormControl
                  sx={{
                    minWidth: 40,
                    minHeight: 40,
                    width: '80%',
                    height: '100% !important',
                  }}
                  className="Selectdropstyle fs18px "
                  size="small"
                >
                  <TextField
                    select
                    style={{ height: '100% !important' }}
                    className="Selectdropstyle-noborder analytics_dropDown "
                    labelid="demo-select-small"
                    id="demo-select-small"
                    // inputProps={{ "aria-label": "Without label" }}
                    value={orderType}
                    defaultValue={branchDepth1}
                    onChange={(e) => {
                      setOrderType(e.target.value);
                      setBranchDepth1(dispatch, e.target.value);
                    }}
                    required
                  >
                    for (var i = 0; i < 49; i++){

                    }
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
                        branchDepth2 == 18 || branchDepth3 == 18 ? true : false
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
                  className="IntBorder bRadius_8 fs16px"
                  value={branchDepth1}
                  onChange={(e) => setBranchDepth1(dispatch, e.target.value)}
                  required
                />
              </Grid>
              <Grid
                container
                item
                xs={2}
                sm={3}
                md={3}
                lg={3}
                className=" flexDir"
              >
                <Typography className=" fs16px g_color  fontWeight500">
                  Depth 2
                </Typography>
                <InputBase
                  type="number"
                  className="IntBorder bRadius_8 fs16px"
                  value={branchDepth2}
                  onChange={(e) => setBranchDepth2(dispatch, e.target.value)}
                  required
                />
              </Grid>
              <Grid
                container
                item
                xs={2}
                sm={3}
                md={3}
                lg={3}
                className=" flexDir"
              >
                <Typography className=" fs16px g_color  fontWeight500">
                  Depth 3
                </Typography>
                <InputBase
                  type="number"
                  className="IntBorder bRadius_8 fs16px"
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

      <Container maxWidth="lg">
        <Grid
          container
          style={{
            flexDirection: 'row',
            columnGap: '10px',
            // border: "1px solid red",
          }}
          className="spaceBetween1 mb20px flex "
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className="bRadius_8-2  flexDir AlignStart spaceBetween1   "
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
                  flexDirection: ' column',
                  rowGap: '1rem',
                }}
              >
                <Typography className="fontWeight500 fs18px g_color  fontWeight500">
                  Full Address
                </Typography>
                <textarea
                  className="IntBorder  fontWeight500 fs16px   bRadius_8"
                  value={branchAddress}
                  onChange={(e) => setBranchAddress(dispatch, e.target.value)}
                  required
                />
              </Grid>
              <Grid
                container
                style={{
                  // border: "1px solid red",
                  rowGap: '1rem',
                }}
                className=" p10px flexDir"
              >
                <Grid
                  container
                  style={{
                    flexDirection: 'row',
                    // border: "1px solid red",
                  }}
                  className="flex spaceBetween1  "
                >
                  <Grid item xs={12} sm={5} md={5}>
                    <Typography className=" fs18px g_color  fontWeight500">
                      Pincode
                    </Typography>
                    <InputBase
                      type="number"
                      className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
                      value={branchPincode}
                      onChange={(e) =>
                        setBranchPincode(dispatch, e.target.value)
                      }
                      required
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <Typography className=" fs18px g_color  fontWeight500">
                      City
                    </Typography>
                    <InputBase
                      className="IntBorder fontWeight500  fs16px   bRadius_8 Width100 "
                      value={branchCity}
                      onChange={(e) => setBranchCity(dispatch, e.target.value)}
                      required
                      readOnly
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  style={{
                    flexDirection: 'row',
                  }}
                  className="flex spaceBetween1  "
                >
                  <Grid item xs={12} sm={5} md={5}>
                    <Typography className="fontWeight500  fs18px g_color  fontWeight500">
                      State
                    </Typography>
                    <InputBase
                      className=" bRadius_8  fontWeight500 IntBorder fs16px  Width100 "
                      value={branchState}
                      onChange={(e) => setBranchState(dispatch, e.target.value)}
                      required
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <Typography className="fs18px g_color  fontWeight500 ">
                      Country
                    </Typography>
                    <InputBase
                      className="IntBorder  fs16px   bRadius_8 fs16px   fontWeight500 Width100"
                      value={branchCountry}
                      onChange={(e) =>
                        setBranchCountry(dispatch, e.target.value)
                      }
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
            // sx={{ height: '330px ', overflow: 'hidden' }}
          >
            <Typography className=" fs20px mb20px bold">
              Mark Position on map
            </Typography>
            <DetailMap
              updateLat={(e) => setBranchGeoLatitude(dispatch, e)}
              updateLng={(e) => setBranchGeoLongitude(dispatch, e)}
              changeable={true}
              update={(lat, lng) => console.log(lat, lng)}
              height={'280px'}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BranchManager;
