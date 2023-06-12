import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Grid,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useSnackbar } from "notistack";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import HighlightOff from "@mui/icons-material/HighlightOff";
import { adminRequest } from "../../requestMethod";
import { useLoaderController, setLoader } from "../../context/common";
import Add from "../.././assets/images/AddSite.png";
// import AddSite_toUser from "./AddSite_toUser";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2 }}
      {...other}
      className="d_bgcolor white_color fs18px"
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 9,
            top: 7,
          }}
          className=" white_color"
        >
          <HighlightOff className="fs24px" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const AddDevice = (props) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();

  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [siteDetails, setSiteDetails] = useState([]);
  const [inputDisabled, setInputDisabled] = useState(false);

  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [deviceMacId, setDeviceMacId] = useState("");

  const saveData = async () => {
    setLoader(dispatch, true);
    let body = {
      // clientID: clientId,
      // clientName: clientName,
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const AddDevice = async (e) => {
    e.preventDefault()
    setLoader(dispatch, true);
    let body = {
      uID: deviceId,
      deviceName: deviceName,
      macID: deviceMacId,
    };
    try {
      const res = await adminRequest.post(`/devices/create`, body);
      // console.log("Devices add in livestock ", res, res.data, res.data.data);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        enqueueSnackbar(res?.data?.message||"device successfully created", {
          variant: "success",
          autoHideDuration: 3000,
        });
        setDeviceId("");
        setDeviceName("");
        setDeviceMacId("");
        setSiteDetails(res.data.data);
        handleClose();
        props.reRender();
      }
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err?.response?.data?.msg||"Someting wrong", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };


  return (
    <>
      {props && props.type == 1 ? (
        <Grid
          container
          item
          alignItems="center"
          sx={{ flexDirection: "column", width: "20%" }}
          className="Greenborder  bRadius_8 Cursor"
          onClick={() => {
            handleClickOpen();
          }}
        >
          <img src={Add} alt="loading" className="M20" />
          <Typography className="fs18px mt10px d_color fontWeight700 mb10px">
            Add Site
          </Typography>
        </Grid>
      ) : (
        <Button
          className="fs16px bRadius_8  d_bgcolor  white_color  Transform_Capital fontWeight700   p_l-r10-30px mb10px"
          onClick={() => {
            handleClickOpen();
          }}
          // p_l-r10-30px
        >
          addDevice
        </Button>
      )}

      <Dialog
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {/* {`Assign ${props?.Name}`} */}
          Add Device
        </BootstrapDialogTitle>
        <form onSubmit={AddDevice}>

        <DialogContent>
          <Grid container className="flex spaceBetween ">
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
                  md={12}
                  lg={12}
                  className="flexDir  Width100"
                >
                  <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                    UID
                  </Typography>
                  <InputBase
                    required
                    placeholder="Enter UID"
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
                  md={12}
                  lg={12}
                  className="flexDir  Width100"
                >
                  <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                    Device Name
                  </Typography>
                  <InputBase
                    required
                    placeholder="Enter Name"
                    className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
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
                    required
                    placeholder="Enter MacId"
                    className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
                    value={deviceMacId}
                    onChange={(e) => setDeviceMacId(e.target.value)}
                    disabled={inputDisabled}
                  />
                </Grid>
                {/* <Grid
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
                </Grid> */}
              </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            className="fs14px  fontWeight600 d_color Greenborder p_l-r10-30px "
            onClick={() => {
              handleClose();
            }}
          >
            cancel
          </Button>

          <Button
            type="submit"
            className="fs16px  fontWeight600 white_color d_bgcolor p_l-r10-30px  "
            // onClick={() => {
            //   AddDevice();
            // }}
          >
            submit
          </Button>
        </DialogActions>
        </form>

      </Dialog>
    </>
  );
};

export default AddDevice;
