import React from 'react';
import { Grid } from '@mui/material';

import SignIn from './components/signinForm';
import SignUp from './components/signupForm';
import Forgot from './components/forgot';

const index = (props) => {
  return (
    <>
      <Grid
        container
        item
        xm={12}
        sm={12}
        md={12}
        lg={12}
        className="auth-container"
      >
        {props && props.page == 'forgot-password' ? (
          <Forgot />
        ) : props.page == 'sign-up' ? (
          <SignUp />
        ) : (
          <SignIn />
        )}
      </Grid>
    </>
  );
};

export default index;
