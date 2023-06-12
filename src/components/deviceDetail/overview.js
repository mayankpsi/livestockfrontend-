import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Typography, InputBase } from "@mui/material";
import { BiWifi } from "react-icons/bi";
import { FaBatteryThreeQuarters } from "react-icons/fa";
import AddLiveStockToDevice from "../Admin/addLivestockinDevice";
import { useSnackbar } from "notistack";
import { useLoaderController, setLoader } from "../../context/common";
import { adminRequest } from "../../requestMethod";

const Overview = ({ title, data, liveStock, apiEndpoint, reRender }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [controller, dispatch] = useLoaderController();
  const { enqueueSnackbar } = useSnackbar();

  const [updateMap, setUpdateMap] = useState();
  const [inputDisabled, setInputDisabled] = useState(true);
  const [update, setUpdate] = useState(true);

  const [deviceId, setDeviceId] = useState("");
  const [deviceName1, setDeviceName1] = useState("");
  const [deviceMacId, setDeviceMacId] = useState("");

  const [liveStockId, setLiveStockId] = useState("");
  const [liveStockName1, setLiveStockName1] = useState("");

  const saveData = async () => {
    setLoader(dispatch, true);
    let body = {
      uID: deviceId,
      macID: deviceMacId,
      deviceName: deviceName1,
    };
    try {
      const res = await adminRequest.post(
        `/devices/update?deviceID=${id}`,
        body
      );
      console.log("update user ", res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        enqueueSnackbar(res?.data?.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
        reRender();
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
  const LiveStockRemove = async (id) => {
    let body = {
      liveStockID: liveStock?._id,
      deviceID: data?._id,
    };
    try {
      setLoader(dispatch, true);
      const res = await adminRequest.post("/devices/unassign-liveStock ", body);
      console.log(res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        enqueueSnackbar("unassign LiveStock successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
        reRender();
      }
    } catch (err) {}
  };

  useEffect(() => {
    setDeviceId(data?.uID);
    setDeviceName1(data?.deviceName);
    setDeviceMacId(data?.macID);
    setLiveStockId(liveStock?.uID);
    setLiveStockName1(liveStock?.name);
    console.log("Setting unassign", data);
    console.log("Setting unassign liveStock liveStock", liveStock);
  }, [data, liveStock]);

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

        {data && data?.status == true ? (
          <Grid
            container
            item
            className="spaceBetween mb20px p20px bRadius_8  "
            sx={{
              rowGap: "20px ",
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              lg={5}
              className="flexDir  Width100"
            >
              <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                UID
              </Typography>
              <InputBase
                className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
                value={liveStockId}
                onChange={(e) => setLiveStockId(e.target.value)}
                disabled
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              lg={5}
              className="flexDir  Width100"
            >
              <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                Livestock Name
              </Typography>
              <InputBase
                className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
                value={liveStockName1}
                onChange={(e) => setLiveStockName1(e.target.value)}
                disabled
              />
            </Grid>

            <Grid
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              className="flexDir  Width100"
            >
              <Button
                className="fs14px  bRadius_8 Greenborder d_color Transform_Capital fontWeight700"
                onClick={() => LiveStockRemove()}
              >
                LiveStock Remove
              </Button>
            </Grid>
            {/* p_l-r10-30px */}
          </Grid>
        ) : (
          <Grid
            container
            item
            className=" flexDir center  mb20px p20px bRadius_8  "
            // sx={{ rowGap: "20px " }}
          >
            <Typography className="g_color fs10px">
              {" "}
              This device have no livestock assigned{" "}
            </Typography>
            <AddLiveStockToDevice
              D_Id={data && data?._id}
              Name={"LiveStock"}
              reRender={reRender}
            />
            {/* reRender={UserDetails} */}
          </Grid>
        )}
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
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              className="flex AlignCenter "
            >
              <Typography className="fs16px fontWeight700 m_r10px  ">
                <FaBatteryThreeQuarters className="Green_color" />
              </Typography>{" "}
              <Typography className="fs16px g_color fontWeight700 ">
                Battery
              </Typography>
            </Grid>

            <Typography className="fs16px d_color fontWeight700 ">
              {data && data?.status == true ? "ONLINE" : "OFFLINE "}
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
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              className="flex AlignCenter spaceBetween "
            >
              {data && data?.wifiStatus == true ? (
                <BiWifi className="fs20px Green_color fontWeight700 " />
              ) : (
                <BiWifi className="fs20px y_color fontWeight700 " />
              )}
              <Typography className="fs16px g_color fontWeight700 ">
                Network Strength
              </Typography>
            </Grid>

            <Typography className="fs16px g_color fontWeight700 ">
              {data && data?.wifiStatus == true ? (
                <Typography className="fs18px Green_color fontWeight600 ">
                  Good
                </Typography>
              ) : (
                <Typography className="fs18px y_color fontWeight600 ">
                  Good
                </Typography>
              )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Overview;
