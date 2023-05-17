import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";

const ForgotForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("email");

  // handleOTP
  const handleOTP = () => {
    setStep("otp");
    switch (step) {
      case "email":
        setStep("otp");
        break;
      case "otp":
        setStep("password");
        break;
      case "password":
        navigate("/authenticate/sign-in");
        break;
    }
  };
  return (
    <Grid container item className="SignInBox">
      {step != "password" && (
        <>
          <Grid item>
            <Typography className="GreenTextHeading d_color">
              {step == "otp" ? "Verify OTP" : "Forgot Password"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className="GreyText">Email</Typography>
            <input className="inp" />
          </Grid>
          {step == "otp" && (
            <Grid className="flexDir flexStart  ">
              <Typography className="GreyText ">OTP</Typography>
              <input className="inp" type="password" />
              <Grid className=" flex flexEnd ">
                <Typography className="GreySmallText">0:20</Typography>
              </Grid>
            </Grid>
          )}
        </>
      )}
      {step == "password" && (
        <>
          <Grid item>
            <Typography className="GreenTextHeading d_color">
              Generate Password
            </Typography>
          </Grid>
          <Grid item>
            <Typography className="GreyText">New Password</Typography>
            <input className="inp" />
          </Grid>
          <Grid item>
            <Typography className="GreyText">Confirm Password</Typography>
            <input className="inp" />
          </Grid>
        </>
      )}

      <Grid className="flex flexStart">
        <Button
          className="SignInLogin bold d_bgcolor  fs14px"
          onClick={handleOTP}
        >
          {step == "password"
            ? "Create"
            : step == "otp"
            ? "Verify"
            : "Send OTP"}
        </Button>
      </Grid>
      <Grid className="fs14px flex  AlignCenter ">
        <Typography className="fs14px">
          Don't have account?{" "}
          <Link to="/authentication/sign-up " className="d_color fs14px ">
            Sign up
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ForgotForm;
