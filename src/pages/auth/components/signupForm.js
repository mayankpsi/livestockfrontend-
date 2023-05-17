import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";

const signupForm = () => {
  return (
    <Grid container item className="SignInBox">
      <Grid item>
        <Typography className="GreenTextHeading d_color">Join Now</Typography>
      </Grid>
      <Grid item>
        <Typography className="GreyText">Fullname</Typography>
        <input className="inp" />
      </Grid>
      <Grid item>
        <Typography className="GreyText">Email</Typography>
        <input className="inp" />
      </Grid>
      <Grid item>
        <Typography className="GreyText">Password</Typography>
        <input className="inp" />
      </Grid>
      <Grid className="flexDir AlignStart ">
        <Typography className="GreyText">Confirm Password</Typography>
        <input className="inp" type="password" />
      </Grid>

      <Grid className="flex AlignStart ">
        <Button className="SignInLogin bold d_bgcolor  fs14px">Register</Button>
      </Grid>
      <Grid className="fs14px flex AlignCenter">
        <Typography className="fs14px">
          Already have account?{" "}
          <Link to="/authentication/sign-in" className="d_color  fs14px">
            Sign in
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default signupForm;
