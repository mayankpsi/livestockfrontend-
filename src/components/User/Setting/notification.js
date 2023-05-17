import React from "react";
import {
  Grid,
  Typography,
  FormControlLabel,
  Button,
  Switch,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
// import Switch from '@mui/material/Switch';

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[600],
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[600],
  },
}));
const Notification = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? " #E9E9EA " : "#347d00",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  return (
    <div>
      <Grid container className="flexDir">
        <Grid container item xs={12} sm={12} md={12} lg={12} className="mb30px">
          <Typography className="fs20px fontWeight700 ">
            Notifications{" "}
          </Typography>
        </Grid>

        <Grid container className="flexDir" sx={{ rowGap: " 1rem" }}>
          <Grid
            container
            item
            xs={5}
            sm={5}
            md={5}
            lg={5}
            className=" spaceBetween"
          >
            <Typography className="fs18px g_color ">Get alerts </Typography>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </Grid>
          <Grid
            container
            item
            xs={5}
            sm={5}
            md={5}
            lg={5}
            className=" spaceBetween"
          >
            <Typography className="fs18px g_color ">
              New Site assigned{" "}
            </Typography>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </Grid>
          <Grid
            container
            item
            xs={5}
            sm={5}
            md={5}
            lg={5}
            className=" spaceBetween"
          >
            <Typography className="fs18px g_color ">
              New Branch Manager assigned{" "}
            </Typography>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </Grid>
          <Grid
            container
            item
            xs={5}
            sm={5}
            md={5}
            lg={5}
            className=" spaceBetween"
          >
            <Typography className="fs18px g_color ">
              New Device assigned
            </Typography>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Notification;
