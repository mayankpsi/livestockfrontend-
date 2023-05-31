import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Grid,
  RadioGroup,
  Radio,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useSnackbar } from 'notistack';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import HighlightOff from '@mui/icons-material/HighlightOff';
import { adminRequest } from '../../requestMethod';
import { useLoaderController, setLoader } from '../../context/common';

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

const AddSite_toUser = (props) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();

  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [userId, setUserId] = useState();
  const [clientId, setClientId] = useState();
  const [userDetails, setUserDetails] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const UserDetails = async () => {
    setLoader(dispatch, true);
    try {
      const res = await adminRequest.get('/user/getclients');
      // console.log("AddSite ", res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        setUserDetails(res.data.data);
      }
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err.response.data.msg, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };
  const AssignSiteToUser = async () => {
    setLoader(dispatch, true);
    let body = {
      site_id: props?.gatewayID,
      client_id: clientId,
    };
    // console.log("Assigning", body);
    try {
      const res = await adminRequest.post('/user/addSiteToClient', body);
      console.log('Site Assign to user ', res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        enqueueSnackbar('Site Assign to user Successfully ', {
          variant: 'success',
          autoHideDuration: 3000,
        });
        handleClose();
      }
      if (res?.response?.status == 400) {
        enqueueSnackbar(res?.response?.data?.msg, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err.response.data.msg, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };
  useEffect(() => {
    UserDetails();
    console.log('props of site add', props, clientId);
  }, []);

  return (
    <>
      <ControlPointIcon
        className="fs24px d_color"
        onClick={() => {
          handleClickOpen();
        }}
      />
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
          {`Assign ${props?.Name}`}
        </BootstrapDialogTitle>

        <DialogContent>
          <Grid container className="flex spaceBetween">
            {' '}
            <Grid
              container
              item
              xs={5}
              sm={5}
              md={4}
              lg={4}
              className=" fs16px  fontWeight600   "
            >
              {`Select ${props?.Name}`}
            </Grid>
            <Grid
              container
              item
              xs={5}
              sm={6}
              md={6}
              lg={6}
              className=" mb20px mt10px"
            >
              <input
                className="inp p_l-r10px fs14px"
                type="text"
                value={userId}
                placeholder="Search UserID / Name"
                onChange={(e) => setUserId(e.target.value)}
              />
            </Grid>{' '}
          </Grid>

          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{
              rowGap: '1rem',
            }}
            // spaceBetween
            className=" flex flexStart  fs16px  p_t-b10px  "
          >
            {userDetails && userDetails.length > 0 ? (
              userDetails.map((a, i) => (
                <Grid
                  key={i}
                  container
                  item
                  xs={2.8}
                  sm={2.8}
                  md={2.8}
                  lg={2.8}
                  className="border  bRadius_8 m_r10px  "
                >
                  <Grid
                    item
                    xs={2}
                    sm={2}
                    md={2}
                    lg={2}
                    className=" flex center fs35px "
                  >
                    <input
                      type="radio"
                      id="specifyColor"
                      name="fav_language"
                      value={a?._id}
                      className="Cursor  "
                      // style={{ backgroundColor: "green" }}
                      onChange={(e) => setClientId(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    className="flexDir p_t-b3-px"
                    // For="specifyColor"
                  >
                    <Typography className="  fs14px  p_l-r10px fontWeight700 g_color">
                      {a?.clientID}
                    </Typography>
                    <Typography className="fs16px  p_l-r10px fontWeight700 Transform_Capital ">
                      {a?.clientName}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid
                container
                style={{ height: '100px' }}
                className=" border center "
              >
                {/* <Grid
                  container
                  item
                  alignItems="center"
                  sx={{ flexDirection: "column", width: "20%" }}
                  className="Greenborder  bRadius_8 Cursor"
                  onClick={() => {
                    navigate("/admin/device-management/add-site-management");
                  }}
                >
                  <img src={Add} alt="loading" className="M20" />
                  <Typography className="fs18px mt10px d_color fontWeight700 mb10px">
                    Add Site
                  </Typography>
                </Grid> */}
              </Grid>
            )}
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
            className="fs16px  fontWeight600 white_color d_bgcolor p_l-r10-30px  "
            onClick={() => {
              //   RegisterUser();
              AssignSiteToUser();
            }}
          >
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSite_toUser;
