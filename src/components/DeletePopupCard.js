import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { MdDeleteOutline } from "react-icons/md";
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
export default function MaxWidthDialog({
  Name,
  DeviceId,
  liveStockId,
  userID,
  deviceID,
  reRender,
}) {
  const [controller, dispatch] = useLoaderController();
  const { enqueueSnackbar } = useSnackbar();

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
    if (Name == "Device1" || Name == "Device2") {
      setLoader(dispatch, true);
      try {
        if (Name == "Device1") {
          await adminRequest.post(`devices/unassign-liveStock`, {
            liveStockID: liveStockId,
            deviceID: DeviceId,
          });
        }
        const res1 = await adminRequest.delete(
          `/devices/delete?deviceID=${DeviceId}`
        );
        setLoader(dispatch, false);
        if (res1.status == 200 || res1.status == 201) {
          enqueueSnackbar("Device Deleted", {
            variant: "success",
            autoHideDuration: 3000,
          });
          reRender();
          handleClose();
        }
      } catch (err) {
        console.log("error in deactived account ", err);
        setLoader(dispatch, false);
        enqueueSnackbar(err, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } else if (Name == "liveStock") {
      setLoader(dispatch, true);
      try {
        if (DeviceId) {
          await adminRequest.post(`devices/unassign-liveStock`, {
            liveStockID: liveStockId,
            deviceID: DeviceId,
          });
        }

        const res1 = await adminRequest.delete(
          `liveStock/delete?liveStockID=${liveStockId}`
        );

        if (res1.status == 200 || res1.status == 201) {
          enqueueSnackbar("liveStock successfully Deleted", {
            variant: "success",
            autoHideDuration: 3000,
          });
          setLoader(dispatch, false);
          reRender();
          handleClose();
        }
      } catch (err) {
        setLoader(dispatch, false);
        console.log("error in deactived account ");
        setLoader(dispatch, false);
        enqueueSnackbar(err?.response.data.msg, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } else if (Name == "user") {
      setLoader(dispatch, true);
      try {
        if (userID) {
          await adminRequest.post(`/user/unassign-device`, {
            userID: userID,
            deviceID: deviceID,
          });
        }

        const res1 = await adminRequest.delete(`/user/delete?userID=${userID}`);

        if (res1.status == 200 || res1.status == 201) {
          enqueueSnackbar("User successfully Deleted", {
            variant: "success",
            autoHideDuration: 3000,
          });
          setLoader(dispatch, false);
          reRender();
          handleClose();
        }
      } catch (err) {
        setLoader(dispatch, false);
        console.log("error in deactived account ");
        setLoader(dispatch, false);
        enqueueSnackbar(err?.response.data.msg, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };
  useEffect(() => {
    console.log("yyggvggz", deviceID, userID);
  }, [userID]);

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
            {`Are you sure you want to delete the ${
              Name == "Device1" || Name == "Device2" ? "Device" : Name
            } ?`}
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
