import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";
import {
  DnsIcon,
  NotificationsNoneIcon,
  LogoutIcon,
  SettingsIcon,
} from "../../icons";
import { Dash } from "../../assets";
import { BiMenu } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
      >
        <Grid
          container
          item
          justifyContent="flex-end"
          sx={{ width: "200px" }}
        >
          <Grid item className="flex center ">
            {" "}
            <NotificationsNoneIcon className=" g_color fs24px " />
          </Grid>

          <Grid
            item
            sx={{
              columnGap: "10px",
              padding: "5px",
              borderRadius: "5px",
            }}
            className="flex center ml10px border "
            onClick={handleClick}
          >
            <BiMenu className="icon" fontSize={22} />
            <FaRegUserCircle
              className="icon"
              fontSize={22}
            />
          </Grid>
        </Grid>
      </Grid>
      <Menu
        spacing={1}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          sx: {
            width: 160,
            backgroundColor: "#347D00",
            justifyContent: "space-between",
          },
        }}
      >
        <MenuItem
          dense={true}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            justifyContent: "flex-start",
          }}
        >
          <Typography className="fs16px white_color">Hello User</Typography>
        </MenuItem>
        <Divider style={{ background: "white" }} />
        <MenuItem
          dense={true}
          className="flex  white_color fs16px "
          onClick={() => {
            navigate("/user/dashboard");
          }}
        >
          <img src={Dash} alt="" style={{ height: "15px" }} />

          <Typography className="fs14px ml10px"> Dashboard</Typography>
        </MenuItem>

        <MenuItem
          dense={true}
          className="flex  white_color fs16px "
          onClick={() => {
            navigate("/user/site-management");
          }}
        >
          <DnsIcon />
          <Typography className="fs14px ml10px "> Site Management</Typography>
        </MenuItem>

        <MenuItem
          dense={true}
          className="flex  white_color fs16px "
          onClick={() => {
            navigate("/user/settings");
          }}
        >
          <SettingsIcon />
          <Typography className="fs14px ml10px"> Setting</Typography>
        </MenuItem>
        <MenuItem
          dense={true}
          className="flex  white_color fs16px "
          onClick={() => {
            localStorage.removeItem("agro_type");
            localStorage.removeItem("agro_token");
            localStorage.removeItem("agro_user");
            navigate("/authentication/sign-in");
          }}
        >
          <LogoutIcon sx={{ color: "white" }} />
          <Typography className="fs14px ml10px ">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
