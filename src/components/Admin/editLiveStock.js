import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Select,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import HighlightOff from '@mui/icons-material/HighlightOff';
import { adminRequest, adminFileRequest } from '../../requestMethod';
import { useLoaderController, setLoader } from '../../context/common';
import Add from '../.././assets/images/AddSite.png';
import Upload from '../.././assets/images/folderUpload.png';
import AddSite_toUser from './AddSite_toUser';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
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
            position: 'absolute',
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

const EditLivestock = ({ data, reRender, closeModel }) => {
  const navigate = useNavigate();
  //   const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();

  const [open, setOpen] = useState(true);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');

  const [siteDetails, setSiteDetails] = useState([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [filetype, setFileType] = useState(null);
  const [file, setFile] = useState(null);
  const [update, setUpdate] = useState(true);
  const [imagestring, setImagestring] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const [liveStockId, setLiveStockId] = useState('');
  const [liveStockName, setLiveStockName] = useState('');
  const [liveStockDevice, setLiveStockDevice] = useState('');
  const [liveStockPicture, setLiveStockPicture] = useState(null);
  const [allDevice, setAllDevice] = useState('');
  const [imageChanges, setImageChanges] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    closeModel();
  };

  const editLiveStock = async (e) => {
    e.preventDefault();
    setLoader(dispatch, true);

    const formData = new FormData();
    formData.append('id', data?._id);
    formData.append('uID', liveStockId);
    formData.append('name', liveStockName);
    formData.append('imageChanges', imageChanges);
    if (imageChanges) {
      formData.append('liveStockImage', liveStockPicture);
      formData.append('liveStockImageName', liveStockPicture.name);
    }

    try {
      const res = await adminFileRequest.post(
        `/liveStock/update`,
        formData
        // {http://localhost:8080/api/v1
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("liveStock_token")}`,
        //     "Content-Type": "text/html; charset=utf-8",
        //   },
        // }
      );
      console.log('Sitefor user ', res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        handleClose();
        enqueueSnackbar('LiveStock successfully updated', {
          variant: 'success',
          autoHideDuration: 3000,
        });
        reRender();
      }
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err?.response, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  const onChangeFile = (event) => {
    if (event.target.files[0].type == 'image/jpeg') {
      //   if (event.target.files[0]?.size / 1000000 > 5) {
      //     setImageSizeDialogue(true);
      //     return;
      //   }
      const file = event.target.files[0];
      setFile(URL.createObjectURL(event.target.files[0]));
      setFileType(event.target.files[0].type);
      //   setLoading(false);
      console.log('filetype Image ==> ', event.target.files[0].type);
      setFileType(event.target.files[0].type); //==> getting File type of here
      let Milliseconds =
        String(new Date().getFullYear()) +
        String(new Date().getMonth()) +
        String(new Date().getDate()) +
        String(new Date().getHours()) +
        String(new Date().getMinutes()) +
        String(new Date().getMilliseconds());
      let a = event.target.files[0].name.split('.')[0];
      console.log('Image Oriiginal Name ===> ', a);
      //   setImageoriginalname(a);
      //   // props.data.handleCampaignData(a, "imageoriginalname");
      //   let trimmedstr = a
      //     .replace(/[&\/\\_#,^!-@+()$~%'":-?<>{}\s+]/g, "")
      //     .concat(Milliseconds);
      //   console.log("Unique Image => ", `${UserID}_${trimmedstr}`);
      //   setTrimmedname(`${UserID}_${trimmedstr}`);
      // props.data.handleCampaignData(trimmedstr, "contentname");
      let extension = '.'.concat(event.target.files[0].name.split('.')[1]);
      console.log('Image Extension ===>', extension);
      //Converting to Base 64 ===>

      const onLoad = (fileString) => {
        setImagestring(fileString);
      };
    }
  };

  useEffect(() => {
    setLiveStockName(data?.name);
    setLiveStockId(data?.uID);
    setFileType('jpeg');
    setLiveStockPicture(data?.imgPath?.split('uploads')[1]);
  }, [data]);

  return (
    <>
      {/* <Button
        className="fs14px  bRadius_8 Greenborder d_bgcolor  white_color Transform_Capital fontWeight700  p_l-r10-30px  mb10px"
        onClick={() => {
          handleClickOpen();
        }}
        // p_l-r10-30px
      >
        edit
      </Button> */}

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
          Edit LiveStock
        </BootstrapDialogTitle>
        <form onSubmit={editLiveStock}>
          <DialogContent>
            <Grid container className="flex spaceBetween ">
              <Grid
                container
                item
                className="spaceBetween mb20px p20px bRadius_8  "
                sx={{ rowGap: '20px ' }}
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

                  {!filetype || filetype == 'jpg' ? (
                    <Grid
                      container
                      item
                      md={12}
                      className="flexDir center border p10px bRadius_8"
                      variant="raised"
                      style={{ position: 'relative' }}
                    >
                      <img src={Add} alt="loading" className="" />
                      <Typography className="fs14px fontFamily">
                        Click here to upload from your devices
                      </Typography>
                      <Typography className="fs12px fontFamily">
                        (Format: jpg,jpeg)
                      </Typography>

                      <>
                        <input
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            opacity: '0',
                            border: '2px solid red',
                          }}
                          type="file"
                          id="raised-button-file"
                          accept="image/jpeg, image/jpg"
                          onChange={(e) => {
                            setImageChanges(true);
                            setLiveStockPicture(e.target.files[0]);
                            onChangeFile(e);
                            // handleVideoUpload(e);
                          }}
                          required
                          disabled={videoLink ? true : false}
                        />
                      </>
                      {/* )} */}
                    </Grid>
                  ) : (
                    <>
                      <Typography
                        className="mt10px"
                        style={{
                          width: '100%',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}
                      >
                        <CloseIcon
                          onClick={() => setFileType(null)}
                          style={{
                            width: '20px',
                            cursor: 'pointer',
                          }}
                        />
                        <img
                          required
                          src={
                            !imageChanges
                              ? `http://localhost:8080/uploads/${liveStockPicture}`
                              : file
                          }
                          style={{
                            height: '250px',
                            width: '100%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            objectFit: 'contain',
                          }}
                          // className="dotted-border"
                        />
                      </Typography>
                      <input
                        style={{ display: 'none' }}
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
              type="submit"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditLivestock;
