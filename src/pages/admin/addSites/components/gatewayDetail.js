import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Typography,
  InputBase,
  Divider,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import {
  useAddSiteController,
  setGatewayId,
  setGatewayName,
  setGatewayAddress,
  setGatewayPincode,
  setGatewayCity,
  setGatewayState,
  setGatewayCountry,
  setGatewayGeoLatitude,
  setGatewayGeoLongitude,
  setBranchPincode,
  setBranchCity,
  setBranchState,
  setBranchCountry,
  setNodeData,
} from '../../../../context/addSite';
import { useLoaderController, setLoader } from '../../../../context/common';

import DetailMap from '../../../../components/Common/detailMap';

const Overview = ({ title }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [controller, dispatch] = useAddSiteController();
  const [loaderController, loaderDispatch] = useLoaderController();

  const {
    gatewayId,
    gatewayName,
    gatewayAddress,
    gatewayPincode,
    gatewayCity,
    gatewayState,
    gatewayCountry,
    gatewayGeoLongitude,
    gatewayGeoLatitude,
    nodeData,
  } = controller;

  const getFullAddressByPinCode = async (pincode) => {
    setLoader(loaderDispatch, true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const res = await response.json();
      setLoader(loaderDispatch, false);

      if (res[0].PostOffice === null || res[0].PostOffice === undefined) {
        setGatewayCity(dispatch, '');
        setGatewayState(dispatch, '');
        setGatewayCountry(dispatch, '');
        setBranchPincode(dispatch, '');
        setBranchCity(dispatch, '');
        setBranchState(dispatch, '');
        setBranchCountry(dispatch, '');
        enqueueSnackbar('Please Provide valid pincode', {
          variant: 'error',
          autoHideDuration: 3000,
        });
        return;
      }

      let data = res[0].PostOffice[0];
      setGatewayCity(dispatch, data.District);
      setGatewayState(dispatch, data.State);
      setGatewayCountry(dispatch, data.Country);
      setBranchPincode(dispatch, pincode);
      setBranchCity(dispatch, data.District);
      setBranchState(dispatch, data.State);
      setBranchCountry(dispatch, data.Country);
      let newNode = [...nodeData];
      newNode.map((item) => {
        item.nodePincode = pincode;
        item.nodeCity = data.District;
        item.nodeState = data.State;
        item.nodeCountry = data.Country;
      });
    } catch (err) {
      setLoader(loaderDispatch, false);
      // console.log('error in getFullAddressByPinCode', err);
      enqueueSnackbar('Error in getFullAddressByPinCode', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <>
      <Grid
        container
        style={{
          flexDirection: 'row',
          columnGap: '10px',
        }}
        className="flex bRadius_8 mb20px p3px "
      >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="bRadius_8-2 flexDir AlignStart spaceBetween1  "
          >
            <Typography className=" fs20px mb20px bold">
              {' '}
              {title ? title : 'Gateway Details'}
            </Typography>
            <Grid container className="border bRadius_8 ">
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
                  {'Gateway ID'}
                </Typography>
                <InputBase
                  type="number"
                  className="IntBorder  fontWeight500 fs16px   bRadius_8"
                  value={gatewayId}
                  onChange={(e) => {
                    if (e.target.value.length <= 8)
                      setGatewayId(dispatch, e.target.value);
                  }}
                  required
                />
                <Typography className="fontWeight500 fs18px g_color  fontWeight500">
                  {' Gateway Name'}
                </Typography>
                <InputBase
                  className="IntBorder fontWeight500 fs16px    bRadius_8"
                  value={gatewayName}
                  onChange={(e) => setGatewayName(dispatch, e.target.value)}
                  required
                />
                <Typography className="fontWeight500 fs18px g_color  fontWeight500">
                  Full Address
                </Typography>
                <textarea
                  className="IntBorder  fontWeight500 fs16px   bRadius_8 fontFamily"
                  value={gatewayAddress}
                  onChange={(e) => setGatewayAddress(dispatch, e.target.value)}
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
                  className="flex spaceBetween1 "
                >
                  <Grid item xs={12} sm={5} md={5}>
                    <Typography className=" fs18px g_color  fontWeight500">
                      Pincode
                    </Typography>
                    <InputBase
                      type="number"
                      className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
                      value={gatewayPincode}
                      onChange={(e) => {
                        if (e.target.value.length > 6) return;
                        if (e.target.value.length == 6)
                          getFullAddressByPinCode(e.target.value);
                        setGatewayPincode(dispatch, e.target.value);
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <Typography className=" fs18px g_color  fontWeight500">
                      City
                    </Typography>
                    <InputBase
                      className="IntBorder fontWeight500  fs16px   bRadius_8 Width100 "
                      value={gatewayCity}
                      onChange={(e) => setGatewayCity(dispatch, e.target.value)}
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
                  className="flex spaceBetween1 "
                >
                  <Grid item xs={12} sm={5} md={5}>
                    <Typography className="fontWeight500  fs18px g_color  fontWeight500">
                      State
                    </Typography>
                    <InputBase
                      className=" bRadius_8  fontWeight500 IntBorder fs16px  Width100 "
                      value={gatewayState}
                      onChange={(e) =>
                        setGatewayState(dispatch, e.target.value)
                      }
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
                      value={gatewayCountry}
                      onChange={(e) =>
                        setGatewayCountry(dispatch, e.target.value)
                      }
                      required
                      readOnly
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          lg={5.8}
          md={5.8}
          sm={12}
          xs={12}
          // sx={{ height: '500px ', overflow: 'hidden' }}
        >
          <Typography className=" fs20px mb20px bold">
            Mark Position on map
          </Typography>
          <DetailMap
            updateLat={(e) => setGatewayGeoLatitude(dispatch, e)}
            updateLng={(e) => setGatewayGeoLongitude(dispatch, e)}
            changeable={true}
            update={(lat, lng) => console.log(lat, lng)}
            height={'470px'}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Overview;
