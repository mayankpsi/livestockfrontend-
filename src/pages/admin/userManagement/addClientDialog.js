import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useSnackbar } from "notistack";
import HighlightOff from "@mui/icons-material/HighlightOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { publicRequest, adminRequest } from "../../../requestMethod";
import { useLoaderController, setLoader } from "../../../context/common";

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
      className="d_bgcolor white_color fs20px"
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
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

export default function CustomizedDialogs({ reRender }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [controller, dispatch] = useLoaderController();

  const ruleNumber = /\d+/g;
  const ruleSpecialChar = /[!@#$%^&*(),.?":{}|<>]/g;
  const ruleCapitalChar = /[A-Z]/g;
  const ruleSmallChar = /[a-z]/g;

  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasCapitalCharacter, setHasCapitalCharacter] = useState(false);
  const [hasSmallCharacter, setHasSmallCharacter] = useState(false);
  const [minCharacters, setMinCharacters] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState();
  const [userPassword, setUserPassword] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [email, setEmail] = useState("");

  const passwordRequirements = [
    "min one number required",
    "min one special characters required",
    "At least 6 characters",
    "A mixture of both uppercase and lowercase letters",
  ];

  const validate = (password) => {
    if (password.length > 5) setMinCharacters(true);
    else setMinCharacters(false);
    if (ruleNumber.test(password)) setHasNumber(true);
    else setHasNumber(false);
    if (ruleSpecialChar.test(password)) setHasSpecialCharacter(true);
    else setHasSpecialCharacter(false);
    if (ruleCapitalChar.test(password)) setHasCapitalCharacter(true);
    else setHasCapitalCharacter(false);
    if (ruleSmallChar.test(password)) setHasSmallCharacter(true);
    else setHasSmallCharacter(false);
  };

  const checkPassword = (value) => {
    validate(value);
    setUserPassword(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createUser = async (e) => {
    e.preventDefault();
    if (
      !hasNumber ||
      !hasSpecialCharacter ||
      !minCharacters ||
      !hasSmallCharacter ||
      !hasCapitalCharacter
    ) {
      enqueueSnackbar("Please provide strong password", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    if (userPassword) {
      let body = {
        userID: userId,
        name: userName,
        email: email,
        password: userPassword.trim(),
        phone: userPhone.trim(),
      };
      setLoader(dispatch, true);
      try {
        const res = await adminRequest.post("/user/create", body);
        setLoader(dispatch, false);
        console.log(res);
        if (res.status == 200 || res.status == 201) {
          enqueueSnackbar("User Registered done", {
            variant: "success",
            autoHideDuration: 3000,
          });
          setUserName("");
          setUserId("");
          setUserPassword("");
          setEmail("");
          setUserPhone("");
          reRender();
          handleClose();
        } else {
          enqueueSnackbar(res?.response?.data?.message, {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      } catch (err) {
        setLoader(dispatch, false);
        console.log(err);
        enqueueSnackbar(err?.response?.data?.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } else {
      enqueueSnackbar("Password are must be same", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div>
      <Button
        className="fs16px  fontWeight600 d_color Greenborder p_l-r30px"
        onClick={() => {
          handleClickOpen();
        }}
      >
        Add User
      </Button>
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
          Add User
        </BootstrapDialogTitle>
        <form onSubmit={(e) => createUser(e)}>
          {/*  */}
          <DialogContent>
            {/* <Grid container className=" fs18px mt10px  fontWeight600 ">
              Enter Client Detail
            </Grid> */}
            <Grid
              container
              className=" fs20px mt10px  fontWeight600 flexDir"
              sx={{ rowGap: "1rem" }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ rowGap: "1rem" }}
              >
                <Typography className="fs18px "> User ID</Typography>
                <input
                  className="inp p_l-r10px fs16px"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ rowGap: "1rem" }}
              >
                <Typography className="fs18px "> User Name</Typography>
                <input
                  className="inp  p_l-r10px fs16px "
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ rowGap: "1rem" }}
              >
                <Typography className="fs18px "> Email</Typography>
                <input
                  className="inp  p_l-r10px fs16px "
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  rowGap: "1rem",
                }}
              >
                <Typography className="fs18px "> Password </Typography>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{
                    position: "relative",
                  }}
                >
                  <input
                    className="inp p_l-r10px fs16px "
                    type={showPasscode ? "text" : "password"}
                    value={userPassword}
                    onChange={(e) => checkPassword(e.target.value)}
                    required
                  />
                  <Grid
                    item
                    sx={{
                      position: "absolute",
                      right: "10px",
                      top: "13px",
                      height: 20,
                      fontSize: 18,
                    }}
                  >
                    {showPasscode ? (
                      <VisibilityOffIcon
                        className="fs16px"
                        onClick={() => {
                          setShowPasscode(false);
                        }}
                      />
                    ) : (
                      <VisibilityIcon
                        className="fs16px"
                        onClick={() => {
                          setShowPasscode(true);
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
                <Typography className="fs14px p_l-r10px">
                  <Typography
                    className="fs14px"
                    sx={hasNumber ? { display: "none" } : { color: "red" }}
                  >
                    {passwordRequirements[0]}
                  </Typography>
                  <Typography
                    className="fs14px"
                    sx={
                      hasSpecialCharacter
                        ? { display: "none" }
                        : { color: "red" }
                    }
                  >
                    {passwordRequirements[1]}
                  </Typography>
                  <Typography
                    className="fs14px"
                    sx={minCharacters ? { display: "none" } : { color: "red" }}
                  >
                    {passwordRequirements[2]}
                  </Typography>
                  <Typography
                    className="fs14px"
                    sx={
                      hasSmallCharacter && hasCapitalCharacter
                        ? { display: "none" }
                        : { color: "red" }
                    }
                  >
                    {passwordRequirements[3]}
                  </Typography>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ rowGap: "1rem" }}
              >
                <Typography className="fs18px "> Phone Number</Typography>
                <input
                  className="inp  p_l-r10px fs16px "
                  type="number"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  required
                />
              </Grid>

              {/* <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ rowGap: "1rem" }}
              >
                <Typography className="fs18px "> Confirm Password </Typography>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{
                    position: "relative",
                    // border: "1px solid red",
                  }}
                >
                  <input
                    className="inp p_l-r10px fs16px "
                    type={showConfirmPasscode ? "text" : "password"}
                    value={userConfirmPassword}
                    onChange={(e) => setUserConfirmPassword(e.target.value)}
                    required
                  />
                  <Grid
                    item
                    sx={{
                      position: "absolute",
                      right: "10px",
                      bottom: "15px",
                      height: 20,
                      fontSize: 18,
                      // width: 30,
                    }}
                  >
                    {showConfirmPasscode ? (
                      <VisibilityOffIcon
                        className="fs16px"
                        onClick={() => {
                          setShowConfirmPasscode(false);
                        }}
                      />
                    ) : (
                      <VisibilityIcon
                        className="fs16px"
                        onClick={() => {
                          setShowConfirmPasscode(true);
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid> */}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              className="fs16px  fontWeight600 d_color Greenborder p_l-r10-30px "
              onClick={() => {
                handleClose();
              }}
            >
              cancel
            </Button>
            {/* <input
              type="submit"
              className="fs16px  fontWeight600 white_color d_bgcolor p_l-r10-30px  "
            /> */}
            <Button
              type="submit"
              className="fs16px  fontWeight600 white_color d_bgcolor p_l-r10-30px  "
            >
              submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
