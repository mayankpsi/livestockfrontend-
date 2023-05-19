import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Typography, InputBase } from "@mui/material";
import { BiWifi } from "react-icons/bi";
// import DetailForm from "../Common/detailForm";
// import DetailMap from "../Common/detailMap";
// import TableHead from "../User/BranchManagerTable";
import Heart from "../../../../../assets/images/heart.png";
import Temp from "../../../../../assets/images/temp.png";
import Feet from "../../../../../assets/images/feet.png";
import Locpin from "../../../../../assets/images/locPin.png";
import { useSnackbar } from "notistack";
import { useLoaderController, setLoader } from "../../../../../context/common";
import { adminRequest } from "../../../../../requestMethod";

const Overview = ({ title, data, apiEndpoint }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [controller, dispatch] = useLoaderController();
  const { enqueueSnackbar } = useSnackbar();

  const [updateMap, setUpdateMap] = useState();
  const [inputDisabled, setInputDisabled] = useState(true);
  const [update, setUpdate] = useState(true);

  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");

  const saveData = async () => {
    setLoader(dispatch, true);
    let body = {
      clientID: clientId,
      clientName: clientName,
      client_id: id,
    };
    try {
      const res = await adminRequest.post(`/user/userupdate/`, body);
      console.log("update user ", res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        enqueueSnackbar(res?.data?.msg, {
          variant: "success",
          autoHideDuration: 3000,
        });
        navigate(`/admin/user-management/${id}`, { state: update });
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

  return (
    <>
      <Grid container className=" flex spaceBetween mb20px">
        <Grid
          item
          md={2.5}
          className="TabStyleAddDevice p20px flexDir bRadius_10"
          sx={{ rowGap: "2rem" }}
        >
          <Grid item className="Width100   flex spaceBetween">
            <img src={Heart} alt="heartbeat" />
            <Typography className="fs14px  flexDir AlignStart">
              {" "}
              02:48 PM{" "}
            </Typography>
          </Grid>
          <Grid item className="Width100 flex spaceBetween">
            <Typography className="fs14px "> Heartbeat </Typography>
            <Typography className="fs16px d_color"> 98 </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          md={2.5}
          className="TabStyleAddDevice p20px flexDir bRadius_10"
          sx={{ rowGap: "2rem" }}
        >
          <Grid item className="Width100   flex spaceBetween">
            <img src={Temp} alt="heartbeat" />
            <Typography className="fs14px  flexDir AlignStart">
              {" "}
              02:48 PM{" "}
            </Typography>
          </Grid>
          <Grid item className="Width100 flex spaceBetween">
            <Typography className="fs14px "> Temperature </Typography>
            <Typography className="fs16px d_color"> 102'c </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          md={2.5}
          className="TabStyleAddDevice p20px flexDir bRadius_10"
          sx={{ rowGap: "2rem" }}
        >
          <Grid item className="Width100   flex spaceBetween">
            <img src={Feet} alt="heartbeat" />
            <Typography className="fs14px  flexDir AlignStart">
              {" "}
              02:48 PM{" "}
            </Typography>
          </Grid>
          <Grid item className="Width100 flex spaceBetween">
            <Typography className="fs14px ">Activity </Typography>
            <Typography className="fs16px d_color"> 230steps </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          md={2.5}
          className="TabStyleAddDevice p20px flexDir bRadius_10"
          sx={{ rowGap: "2rem" }}
        >
          <Grid item className="Width100   flex spaceBetween">
            <img src={Locpin} alt="heartbeat" />
            <Typography className="fs14px  flexDir AlignStart">
              {" "}
              02:48 PM{" "}
            </Typography>
          </Grid>
          <Grid item className="Width100 flex spaceBetween">
            <Typography className="fs14px "> Live Location </Typography>
            {/* <Typography className="fs16px d_color"> 98 </Typography> */}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} className="flex  Width100">
        <Typography className="fs20px b1c_color fontWeight600 ">
          Details
        </Typography>
      </Grid>
      <form>
        <Grid container className="flex spaceBetween Width100">
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={5.5}
            lg={5.5}
            className=" spaceBetween mb20px p20px bRadius_8  "
            sx={{ rowGap: "20px " }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className="flexDir  Width100"
            >
              <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                UID
              </Typography>
              <InputBase
                className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                disabled={inputDisabled}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className="flexDir  Width100"
            >
              <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                Device Name
              </Typography>
              <InputBase
                className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                disabled={inputDisabled}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className="flexDir  Width100"
            >
              <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                Mac Id
              </Typography>
              <InputBase
                className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
                // value={clientId}
                // onChange={(e) => setClientId(e.target.value)}
                disabled={inputDisabled}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={5.5}
            lg={5.5}
            className="flexDir spaceBetween mb20px p20px bRadius_8  "
            sx={{ rowGap: "20px " }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              lg={9}
              className="flexDir  Width100 "
            >
              <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                Images
              </Typography>
              <InputBase
                style={{ height: " 27rem" }}
                className=" TabStyleAddDevice p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
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
              className="flexDir flexEnd p_r30px  "
              //   sx={{ border: "1px solid red" }}
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
        </Grid>
      </form>

      <Grid
        container
        style={{
          columnGap: "10px",
        }}
        className="flexDir mb30px "
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
