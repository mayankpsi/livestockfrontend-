import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Typography,
  InputBase,
  Divider,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { useLoaderController, setLoader } from "../../context/common";
import { adminRequest } from "../../requestMethod";

const Index = ({ title, data, apiEndpoint, updateMap }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { gatewayName, branchName, deviceId } = useParams();
  const navigate = useNavigate();
  const [controller, dispatch] = useLoaderController();

  const [author] = useState(localStorage.getItem("agro_type"));
  const [inputDisabled, setInputDisabled] = useState(true);

  const [id, setId] = useState();
  const [uId, setUid] = useState();
  const [name, setName] = useState();
  const [fullAddress, setFullAddress] = useState();
  const [pinCode, setPinCode] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  // const [gatewayData, setGatewayData] = useState([]);

  const getFullAddressByPinCode = async (pincode) => {
    setLoader(dispatch, true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const res = await response.json();
      setLoader(dispatch, false);

      if (res[0].PostOffice === null || res[0].PostOffice === undefined) {
        setCity("");
        setState("");
        setCountry("");
        enqueueSnackbar("Please Provide valid pincode", {
          variant: "error",
          autoHideDuration: 3000,
        });
        return;
      }

      let data = res[0].PostOffice[0];
      setCity(data.District);
      setState(data.State);
      setCountry(data.Country);
    } catch (err) {
      setLoader(dispatch, false);
      // console.log('error in getFullAddressByPinCode', err);
      enqueueSnackbar("Error in getFullAddressByPinCode", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const saveData = async (e) => {
    // alert("save data");
    // setLoader(dispatch, true);
    console.log("data", latitude, longitude);

    let body = {};
    if (title == "Gateway Details") {
      body = {
        id,
        gatewayID: uId,
        gatewayName: name,
        gatewayAddress: fullAddress,
        gatewayPincode: pinCode,
        gatewayCity: city,
        gatewayState: state,
        gatewayCountry: country,
        gatewayGeoLatitude: latitude,
        gatewayGeoLongitude: longitude,
      };
    } else if (title == "Branch Manager Details") {
      // setId(data[0]._id);
      body = {
        id,
        branchID: uId,
        branchName: name,
        branchAddress: fullAddress,
        branchPincode: pinCode,
        branchCity: city,
        branchState: state,
        branchCountry: country,
        branchGeoLatitude: latitude,
        branchGeoLongitude: longitude,
      };
    } else if (title == "Device Details") {
      // setId(data[0]._id);
      body = {
        id,
        nodeID: uId,
        node_id: id,
        nodeName: name,
        nodeAddress: fullAddress,
        nodePincode: pinCode,
        nodeCity: city,
        nodeCountry: country,
        nodeState: state,
        nodeGeoLatitude: latitude,
        nodeGeoLongitud: longitude,
      };
    }
    console.log("bodylist  ", body, apiEndpoint);
    try {
      const res = await adminRequest.patch(apiEndpoint, body);
      console.log("saveData res", res);
      setLoader(dispatch, false);
      if (res.status == 200) {
        enqueueSnackbar(res?.data?.msg, {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar("err", {
        variant: "error",
        autoHideDuration: 3000,
      });
      setLoader(dispatch, false);
    }

    // setLoader(dispatch, false);
    setInputDisabled(true);
  };

  useEffect(() => {
    console.log("Manager used effect", title, data);

    if (title == "Gateway Details" && data && data.length > 0) {
      setUid(data[0]?.gatewayID);
      setName(data[0]?.gatewayName);
      setFullAddress(data[0]?.gatewayAddress);
      setPinCode(data[0]?.gatewayPincode);
      setCity(data[0]?.gatewayCity);
      setState(data[0]?.gatewayState);
      setCountry(data[0]?.gatewayCountry);
      setLatitude(data[0].gatewayGeoLatitude);
      setLongitude(data[0].gatewayGeoLongitude);
      setId(data[0]?._id);
    } else if (title == "Branch Manager Details" && data && data.length > 0) {
      setId(data[0]._id);
      setUid(data[0].branchID);
      setName(data[0].branchName);
      setFullAddress(data[0].branchAddress);
      setPinCode(data[0].branchPincode);
      setCity(data[0].branchCity);
      setState(data[0].branchState);
      setCountry(data[0].branchCountry);
      setLatitude(data[0].branchGeoLatitude);
      setLongitude(data[0].branchGeoLongitude);
    } else if (title == "Device Details" && data && data.length > 0) {
      setId(data[0]._id);
      setUid(data[0].nodeID);
      setName(data[0].nodeName);
      setFullAddress(data[0].nodeAddress);
      setPinCode(data[0].nodePincode);
      setCity(data[0].nodeCity);
      setState(data[0].nodeState);
      setCountry(data[0].nodeCountry);
      setLatitude(data[0].nodeGeoLatitude);
      setLongitude(data[0].nodeGeoLongitude);
    }
  }, [data, title]);

  useEffect(() => {
    console.log("upadteMap used effect", updateMap);
    if (updateMap) {
      setLatitude(updateMap.lat);
      setLongitude(updateMap.lng);
    }
  }, [updateMap]);
  return (
    <>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        style={{
          borderRadius: "8px 8px 0 0",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          //   border: "1px solid red",
        }}
      >
        <form
          style={{ width: "100%" }}
          onSubmit={(e) => {
            e.preventDefault();

            inputDisabled ? setInputDisabled(false) : saveData(e);
          }}
        >
          <Grid container className="spaceBetween">
            <Typography className=" fs20px mb20px bold">
              {" "}
              {title ? title : "Gateway Details"}
            </Typography>
            {author == "admin" && (
              <Button
                type="submit"
                className="fs14px Greenborder d_color Transform_Capital   p_l-r10-30px"
                // onClick={() =>
                //   inputDisabled ? setInputDisabled(false) : saveData()
                // }
              >
                {inputDisabled ? "Edit" : "Save"}
              </Button>
            )}
          </Grid>

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
              {branchName ? "UID" : "Gateway ID"}
            </Typography>
            <InputBase
              type="number"
              className="IntBorder  fontWeight500 fs16px   bRadius_8"
              value={uId}
              onChange={(e) => {
                setUid(e.target.value);
              }}
              disabled={inputDisabled}
              required
            />
            <Typography className="fontWeight500 fs18px g_color  fontWeight500">
              {branchName ? "Name" : " Gateway Name"}
            </Typography>
            <InputBase
              className="IntBorder fontWeight500 fs16px    bRadius_8"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={inputDisabled}
              required
            />
            <Typography className="fontWeight500 fs18px g_color  fontWeight500">
              Full Address
            </Typography>
            <textarea
              className="IntBorder text_bgcolor  fontWeight500 fs16px   bRadius_8"
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              disabled={inputDisabled}
              required
            />
          </Grid>
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              // border: "1px solid red",
              rowGap: "1rem",
            }}
            className=" p10px"
          >
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // border: "1px solid red",
              }}
            >
              <Grid item xs={12} sm={5} md={5}>
                <Typography className=" fs18px g_color  fontWeight500">
                  Pincode
                </Typography>
                <InputBase
                  type="number"
                  className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
                  value={pinCode}
                  onChange={(e) => {
                    if (e.target.value.length > 6) return;
                    if (e.target.value.length == 6)
                      getFullAddressByPinCode(e.target.value);
                    setPinCode(e.target.value);
                  }}
                  disabled={inputDisabled}
                  required
                  readOnly={title == "Gateway Details" ? false : true}
                />
              </Grid>
              <Grid item xs={12} sm={5} md={5}>
                <Typography className=" fs18px g_color  fontWeight500">
                  City
                </Typography>
                <InputBase
                  className="IntBorder fontWeight500  fs16px   bRadius_8 Width100 "
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={inputDisabled}
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
                  className=" bRadius_8  fontWeight500 IntBorder fs16px  Width100 "
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={inputDisabled}
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
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={inputDisabled}
                  required
                  readOnly
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default Index;
