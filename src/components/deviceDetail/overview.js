import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Divider, Typography, InputBase } from "@mui/material";
import { BiWifi } from "react-icons/bi";
import DetailForm from "../Common/detailForm";
import DetailMap from "../Common/detailMap";
import TableHead from "../User/BranchManagerTable";
import { useSnackbar } from "notistack";
import { useLoaderController, setLoader } from "../../context/common";
import { adminRequest } from "../../requestMethod";

const Overview = ({ title, data, apiEndpoint }) => {
  const navigate = useNavigate();
  const { deviceName } = useParams();
  const [controller, dispatch] = useLoaderController();
  const { enqueueSnackbar } = useSnackbar();

  const [updateMap, setUpdateMap] = useState();
  const [inputDisabled, setInputDisabled] = useState(true);
  const [update, setUpdate] = useState(true);

  const [deviceId, setDeviceId] = useState("");
  const [deviceName1, setDeviceName1] = useState("");
  const [deviceMacId, setDeviceMacId] = useState("");

  const saveData = async () => {
    setLoader(dispatch, true);
    let body = {
      uID: deviceId,
      macID: deviceMacId,
      deviceName: deviceName1,
    };
    try {
      const res = await adminRequest.post(
        `/devices/update?deviceID=${deviceName}`,
        body
      );
      console.log("update user ", res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        enqueueSnackbar(res?.data?.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
        // navigate(`/admin/user-management/${id}`, { state: update });
      }
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err.response.data.msg, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    setLoader(dispatch, false);
    setInputDisabled(true);
  };

  const getDeviceDetail = async () => {
    setLoader(dispatch, true);
    try {
      const res = await adminRequest.get(
        `/devices/getDeviceById?deviceID=${deviceName}`
      );
      // console.log("res>> overviewindex file", res?.data?.data);
      if (res.status == 200) {
        setLoader(dispatch, false);
        // setDetails([res?.data?.data]);
      } else {
        console.log("error ");
      }
    } catch (err) {
      console.log("error get device", err);
      setLoader(dispatch, false);
      enqueueSnackbar(err?.response?.data?.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    getDeviceDetail();
  }, []);

  useEffect(() => {
    setDeviceId(data?.uID);
    setDeviceName1(data?.deviceName);
    setDeviceMacId(data?.macID);
  }, [data]);

  return (
    <>
      <form>
        {/* <Grid container className="flex flexEnd mt10px ">
          <Button
            className="fs14px  bRadius_8 Greenborder d_color Transform_Capital fontWeight700  p_l-r10-30px  mb10px"
            onClick={() =>
              inputDisabled ? setInputDisabled(false) : saveData()
            }
          >
            {inputDisabled ? "Edit" : "Save"}
          </Button>
        </Grid> */}
        <Grid
          container
          item
          className="spaceBetween mb20px p20px bRadius_8 border "
          sx={{ rowGap: "20px " }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="flexDir  Width100"
          >
            <Typography className="fs16px mb10px b1c_color fontWeight600 ">
              UID
            </Typography>
            <InputBase
              className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="flexDir  Width100"
          >
            <Typography className="fs16px mb10px b1c_color fontWeight600 ">
              Device Name
            </Typography>
            <InputBase
              className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
              value={deviceName1}
              onChange={(e) => setDeviceName1(e.target.value)}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="flexDir  Width100"
          >
            <Typography className="fs16px mb10px b1c_color fontWeight600 ">
              Mac Id
            </Typography>
            <InputBase
              className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
              value={deviceMacId}
              onChange={(e) => setDeviceMacId(e.target.value)}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={1.5}
            lg={1.5}
            className="flexDir AlignEnd p_r30px  "
          >
            <Button
              className="fs14px  bRadius_8 Greenborder d_color Transform_Capital fontWeight700  p_l-r10-30px  mb10px"
              onClick={() =>
                inputDisabled ? setInputDisabled(false) : saveData()
              }
            >
              {inputDisabled ? "Edit" : "Save"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* <Grid
        container
        style={{
          flexDirection: 'row',
          columnGap: '10px',
        }}
        className="mb20px flex "
      >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <DetailForm
            title={title && title}
            data={data && data}
            apiEndpoint={apiEndpoint || ''}
            updateMap={updateMap}
          />
        </Grid>

        <Grid
          item
          lg={5.8}
          md={5.8}
          sm={12}
          xs={12}
          // sx={{ height: '510px ', overflow: 'hidden' }}
        >
          {data && data.length > 0 && data[0].gatewayGeoLatitude && (
            <DetailMap
              data={{
                lat: updateMap
                  ? updateMap.lat
                  : parseFloat(data[0].gatewayGeoLatitude),
                lng: updateMap
                  ? updateMap.lng
                  : parseFloat(data[0].gatewayGeoLongitude),
              }}
              updateLat={(e) => console.log(e)}
              updateLng={(e) => console.log(e)}
              update={(lat, lng) => setUpdateMap({ lat: lat, lng: lng })}
              height={'470px'}
            />
          )}
        </Grid>
      </Grid> */}

      <Grid
        container
        style={{
          columnGap: "10px",
        }}
        className="flexDir mb20px mt20px"
      >
        <Typography className=" fs20px mb20px  fontWeight700">
          Assigned Livestock
        </Typography>

        <Grid
          container
          item
          className="spaceBetween mb20px p20px bRadius_8  "
          sx={{ rowGap: "20px " }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="flexDir  Width100"
          >
            <Typography className="fs16px mb10px b1c_color fontWeight600 ">
              UID
            </Typography>
            <InputBase
              className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
              // value={clientId}
              // onChange={(e) => setClientId(e.target.value)}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="flexDir  Width100"
          >
            <Typography className="fs16px mb10px b1c_color fontWeight600 ">
              Livestock Name
            </Typography>
            <InputBase
              className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
              // value={clientName}
              // onChange={(e) => setClientName(e.target.value)}
              disabled={inputDisabled}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* <Divider className="Divider" /> */}

      {/* <TableHead data={data && data.length > 0 && data[0]?.branchManager} /> */}

      <Grid
        container
        style={{
          columnGap: "10px",
        }}
        className="flexDir mb20px mt10px"
      >
        <Typography className=" fs20px mb20px  fontWeight700">
          Device Status
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

export default Overview;
