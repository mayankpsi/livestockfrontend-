import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  RadioGroup,
  Radio,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import HighlightOff from "@mui/icons-material/HighlightOff";
import { adminRequest } from "../../requestMethod";
import { useLoaderController, setLoader } from "../../context/common";
import Add from "../.././assets/images/AddSite.png";
import Upload from "../.././assets/images/folderUpload.png";
import AddSite_toUser from "./AddSite_toUser";

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
  //   const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();

  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");

  const [siteDetails, setSiteDetails] = useState([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [filetype, setFileType] = useState(null);
  const [file, setFile] = useState(null);
  const [update, setUpdate] = useState(true);
  const [imagestring, setImagestring] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const [liveStockId, setLiveStockId] = useState("");
  const [liveStockName, setLiveStockName] = useState("");
  const [liveStockDevice, setLiveStockDevice] = useState("");

  const saveData = async () => {
    setLoader(dispatch, true);
    let body = {
      // uID: liveStockNameId,
      // name: liveStockName,
      //   deviceID: liveStockDevice,
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

  const addLiveStock = async () => {
    setLoader(dispatch, true);
    let body = {
      uID: liveStockId,
      name: liveStockName,
      deviceID: liveStockDevice,
      image: file,
    };
    try {
      const res = await adminRequest.post(`/liveStock/create`, body);
      console.log("Sitefor user ", res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
      }
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err.response.data.msg, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    console.log("props>>props", props);
  }, [props]);

  const onChangeFile = (event) => {
    if (event.target.files[0].type == "image/jpeg") {
      //   if (event.target.files[0]?.size / 1000000 > 5) {
      //     setImageSizeDialogue(true);
      //     return;
      //   }
      const file = event.target.files[0];
      setFile(URL.createObjectURL(event.target.files[0]));
      setFileType(event.target.files[0].type);
      //   setLoading(false);
      console.log("filetype Image ==> ", event.target.files[0].type);
      setFileType(event.target.files[0].type); //==> getting File type of here
      let Milliseconds =
        String(new Date().getFullYear()) +
        String(new Date().getMonth()) +
        String(new Date().getDate()) +
        String(new Date().getHours()) +
        String(new Date().getMinutes()) +
        String(new Date().getMilliseconds());
      let a = event.target.files[0].name.split(".")[0];
      console.log("Image Oriiginal Name ===> ", a);
      //   setImageoriginalname(a);
      //   // props.data.handleCampaignData(a, "imageoriginalname");
      //   let trimmedstr = a
      //     .replace(/[&\/\\_#,^!-@+()$~%'":-?<>{}\s+]/g, "")
      //     .concat(Milliseconds);
      //   console.log("Unique Image => ", `${UserID}_${trimmedstr}`);
      //   setTrimmedname(`${UserID}_${trimmedstr}`);
      // props.data.handleCampaignData(trimmedstr, "contentname");
      let extension = ".".concat(event.target.files[0].name.split(".")[1]);
      console.log("Image Extension ===>", extension);
      //Converting to Base 64 ===>

      const onLoad = (fileString) => {
        setImagestring(fileString);
      };
    }
  };

  return (
    <>
      {/* <Button
        className="fs14px bRadius_8  Greenborder d_color Transform_Capital fontWeight700  p_l-r10-30px  mb10px"
        onClick={() => {
          handleClickOpen();
        }}
      >
        Add
      </Button> */}

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
          Add LiveStock
        </BootstrapDialogTitle>

        <DialogContent>
          <Grid container className="flex spaceBetween ">
            <form>
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
                  className="flexDir  Width100 "
                >
                  <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                    Images
                  </Typography>

                  {!filetype || filetype == "jpg" ? (
                    <Grid
                      container
                      item
                      md={12}
                      // htmlFor="raised-button-file"
                      className="flexDir center border p10px bRadius_8"
                      variant="raised"
                      style={{ position: "relative" }}
                    >
                      <img src={Add} alt="loading" className="" />
                      <Typography className="fs14px fontFamily">
                        Click here to upload from your devices
                      </Typography>
                      <Typography className="fs12px fontFamily">
                        (Format: jpg,jpeg)
                      </Typography>
                      {filetype === "video/mp4" ? (
                        <>
                          <input
                            required
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              opacity: "0",
                            }}
                            type="file"
                            id="raised-button-file"
                            accept="video/mp4 image/jpeg,image/jpg"
                            onChange={(e) => {
                              onChangeFile(e);
                              // handleVideoUpload(e);
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <input
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              opacity: "0",
                              border: "2px solid red",
                            }}
                            type="file"
                            id="raised-button-file"
                            accept="video/mp4, image/jpeg, image/jpg"
                            // accept="video/*"
                            // accept="image/jpg,image/jpeg"
                            onChange={(e) => {
                              onChangeFile(e);
                              // handleVideoUpload(e);
                            }}
                            disabled={videoLink ? true : false}
                          />
                        </>
                      )}
                    </Grid>
                  ) : (
                    <>
                      <Typography
                        className="mt10px"
                        style={{
                          width: "100%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <CloseIcon
                          onClick={() => setFileType(null)}
                          style={{
                            width: "20px",
                            cursor: "pointer",
                          }}
                        />
                        <img
                          required
                          src={file}
                          style={{
                            height: "250px",
                            width: "100%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            objectFit: "contain",
                          }}
                          // className="dotted-border"
                        />
                      </Typography>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="raised-button-file"
                        accept="image/jpeg,image/jpg,video/mp4"
                        onChange={(e) => {
                          //   onChangeFile(e);
                          // handleVideoUpload(e);
                          // className = "dotted-border";
                        }}
                      />
                    </>
                  )}
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
                    Device
                  </Typography>
                  <InputBase
                    placeholder="Select Device"
                    className=" border p_t-l15px fs16px Width100  bRadius_8 fontWeight700"
                    value={liveStockDevice}
                    onChange={(e) => setLiveStockDevice(e.target.value)}
                    disabled={inputDisabled}
                    required
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
                    Enter UID
                  </Typography>
                  <InputBase
                    required
                    placeholder="Enter UID"
                    className=" border p_t-l15px fs16px Width100  bRadius_8 fontWeight700"
                    value={liveStockId}
                    onChange={(e) => setLiveStockId(e.target.value)}
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
                    Enter Name
                  </Typography>
                  <InputBase
                    required
                    placeholder="Enter Name"
                    className=" border p_t-l15px fs16px Width100  bRadius_8 fontWeight700"
                    value={liveStockName}
                    onChange={(e) => setLiveStockName(e.target.value)}
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
            </form>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            className="fs14px  fontWeight600 d_color Greenborder p_l-r10-30px "
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>

          <Button
            className="fs16px  fontWeight600 white_color d_bgcolor p_l-r10-30px  "
            onClick={() => {
              addLiveStock();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDevice;
