import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Grid, Typography, Button, Input } from '@mui/material';
// import Visibility from "@mui/icons-material/Visibility";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { publicRequest } from '../../../requestMethod';
import loader from '../../../components/loader';
import { useLoaderController, setLoader } from '../../../context/common';
import { handleSignin } from '../../../store/Slices/dashboardSlice';

const SigninForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);

  //   LoginWithEmail
  const loginHandler = async (e) => {
    e.preventDefault();

    let body = { email: userEmail, password: userPassword.trim() };

    try {
      setLoader(dispatch, true);
      const res = await publicRequest.post('/auth/sign-in', body);
      console.log('login ', res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        localStorage.setItem('liveStock_token', res.data.data.accessToken);
        localStorage.setItem('liveStock_user', res.data.data.user.name);
        // localStorage.setItem("liveStock_type", res.data.user.role);
        // localStorage.setItem("liveStock_id", res.data.data.user._id);

        window.location.href = `/${res.data.data.user.name}/dashboard`;
        enqueueSnackbar('login done', {
          variant: 'success',
          autoHideDuration: 3000,
        });
        // navigate('/admin/dashboard');
        // window.location.href = `/${res.data.data.user.name}/dashboard`;
      } else {
        enqueueSnackbar(res?.response?.data?.msg, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
      setLoader(dispatch, false);
      enqueueSnackbar(err?.response?.data?.message, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('liveStock_token')) navigate(`/admin/dashboard`);
  }, []);

  return (
    <Grid container item className="SignInBox">
      <Grid item>
        <Typography className="GreenTextHeading d_color">Welcome</Typography>
      </Grid>
      <form onSubmit={loginHandler}>
        <Grid
          item
          style={{
            rowGap: '.5rem',
          }}
          className="flexDir AlignStart "
        >
          <Typography className="GreyText">Username</Typography>
          <input
            className="inp p_l15px fs14px"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </Grid>
        <Grid
          item
          style={{
            rowGap: '.5rem',
          }}
          className=" mt5px flexDir AlignStart "
        >
          <Typography className="GreyText">Password</Typography>

          <Grid style={{ position: 'relative' }}>
            <input
              className="inpeyepassword  p_l15px fs14px Width100 "
              type={showPasscode ? 'text' : 'password'}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />

            <Grid
              item
              sx={{
                position: 'absolute',
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
            type="submit"
            className="SignInLogin bold d_bgcolor fs14px mt10px"
          >
            Login
          </Button>
        </Grid>
      </form>
      <Grid className="fs14px flex centerJc ">
        {/* <Typography className="fs14px">
          Don't have account?{' '}
          <Link to="/authentication/sign-up" className="d_color fs14px">
            Sign up
          </Link>
        </Typography> */}
      </Grid>
    </Grid>
  );
};

export default SigninForm;
