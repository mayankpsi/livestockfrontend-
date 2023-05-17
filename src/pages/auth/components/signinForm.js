import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Grid, Typography, Button, Input } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { publicRequest } from "../../../requestMethod";
import loader from "../../../components/loader";
import { useLoaderController, setLoader } from "../../../context/common";

const SigninForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);

  // const [loader, setLoader] = useState(false);

  //   LoginWithEmail
  const Login = async () => {
    if (userEmail && userPassword) {
      // if (userEmail.length > 5 && userPassword.length > 5) {
      if (userPassword.length > 1) {
        if (userPassword.length > 1) {
          let body = { clientID: userEmail, password: userPassword.trim() };

          try {
            setLoader(dispatch, true);
            const res = await publicRequest.post("/authUser/login", body);
            console.log("login ", res);
            setLoader(dispatch, false);
            if (res.status == 200 || res.status == 201) {
              localStorage.setItem("agro_token", res.data.accessToken);
              localStorage.setItem("agro_user", res.data.data.clientName);
              localStorage.setItem("agro_type", res.data.data.role);
              localStorage.setItem("agro_id", res.data.data._id);

              enqueueSnackbar("login done", {
                variant: "success",
                autoHideDuration: 3000,
              });
              window.location.href = `/${res.data.data.role}/dashboard`;
            } else {
              enqueueSnackbar(res?.response?.data?.msg, {
                variant: "error",
                autoHideDuration: 3000,
              });
            }
          } catch (err) {
            console.log(err);
            setLoader(dispatch, false);
            enqueueSnackbar(err?.response?.data?.msg, {
              variant: "error",
              autoHideDuration: 3000,
            });
          }
        } else {
          enqueueSnackbar("Please Enter password", {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      } else {
        enqueueSnackbar("Please Enter valid email address", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
      // } else {
      //   enqueueSnackbar("Please Enter valid password", {
      //     variant: "error",
      //     autoHideDuration: 3000,
      //   });
      // }
    } else {
      enqueueSnackbar("Please enter email and password", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("agro_type"))
      navigate(`/${localStorage.getItem("agro_type")}/dashboard`);
  }, []);

  return (
    <Grid container item className="SignInBox">
      <Grid item>
        <Typography className="GreenTextHeading d_color">Welcome</Typography>
      </Grid>
      <form>
        <Grid
          item
          style={{
            rowGap: ".5rem",
          }}
          className="flexDir AlignStart "
        >
          <Typography className="GreyText">Username</Typography>
          <input
            className="inp p_l15px fs14px"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Grid>
        <Grid
          item
          style={{
            rowGap: ".5rem",
          }}
          className=" mt5px flexDir AlignStart "
        >
          <Typography className="GreyText">Password</Typography>

          <Grid style={{ position: "relative" }}>
            <input
              className="inpeyepassword  p_l15px fs14px Width100 "
              type={showPasscode ? "text" : "password"}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <Grid
              item
              sx={{
                position: "absolute",
                top: 12,
                right: 10,
                height: 20,
                fontSize: 18,
                // width: 30,
                // border: "1px solid red",
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

          <Grid className="flex flexEnd ">
            <Link
              to="/authentication/forgot-password"
              className="GreySmallText"
            >
              Forgot Password?
            </Link>
          </Grid>
        </Grid>

        <Grid className="flex AlignStart ">
          <Button
            className="SignInLogin bold d_bgcolor fs14px mt10px"
            onClick={() => {
              Login();
            }}
          >
            Login
          </Button>
        </Grid>
      </form>
      <Grid className="fs14px flex centerJc ">
        <Typography className="fs14px">
          Don't have account?{" "}
          <Link to="/authentication/sign-up" className="d_color fs14px">
            Sign up
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SigninForm;
