import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { adminRequest } from "../requestMethod";
import { setLoader, useLoaderController } from "../context/common";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1.2, background: "#347d00" }} {...other}>
      {children}
      <Typography className="fs18px white_color Transform_Capital ">
        confirmation
      </Typography>{" "}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
export default function MaxWidthDialog({ Name, gatewayID, reRander }) {
  const [controller, dispatch] = useLoaderController();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState("xs");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Deactived = async () => {
    if (Name == "user") {
      setLoader(dispatch, true);
      try {
        let UserId = localStorage.getItem("saps_id");
        console.log("userIdddgeting in deactivated>>>>", gatewayID);
        const res = await adminRequest.delete(`user/deleteUser/${gatewayID}`);
        console.log(res);
        setLoader(dispatch, false);
        if (res.status == 200 || res.status == 201) {
          enqueueSnackbar("Clients Deleted", {
            variant: "success",
            autoHideDuration: 3000,
          });
          reRander();
          handleClose();
        }
      } catch (err) {
        console.log("error in deactived account ");
        setLoader(dispatch, false);
        enqueueSnackbar(err.response.data.msg, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } else {
      setLoader(dispatch, true);
      try {
        console.log("userIdddgeting in deactivated>>>>", gatewayID);
        const res = await adminRequest.delete(`site/deletesite/${gatewayID}`);
        console.log(res);
        setLoader(dispatch, false);
        if (res.status == 200 || res.status == 201) {
          enqueueSnackbar("Site Deleted", {
            variant: "success",
            autoHideDuration: 3000,
          });
          setLoader(dispatch, false);
          reRander();
          handleClose();
        }
      } catch (err) {
        console.log("error in deactived account ");
        setLoader(dispatch, false);
        enqueueSnackbar(err.response.data.msg, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };
  // useEffect(() => {
  //   console.log('deleteAccount', Name, 'iddd gatewayID', gatewayID);
  // }, [Name]);
  return (
    <React.Fragment>
      <MdDeleteOutline className="fs24px" onClick={handleClickOpen} />

      <BootstrapDialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: "SmallDialog",
        }}
      >
        <BootstrapDialogTitle> </BootstrapDialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#fffff",
            marginTop: "10px",
          }}
        >
          <Typography className="fs18px  ">
            {`Are you sure you want to delete the ${Name && Name}?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            className="fs14px  fontWeight600 d_color Greenborder p_l-r30px"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            className="fs14px fontWeight600 d_color Greenborder p_l-r30px"
            onClick={() => Deactived()}
          >
            Yes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
