import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  InputBase,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DnsIcon from "@mui/icons-material/Dns";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

import { BiMenu, BiBell } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";

import Dash from "../../assets/images/dashboard.png";
import people from "../../assets/images/people.png";
import GIF from "../../assets/images/Notification.gif";

import { styled } from "@mui/material/styles";
import "../../assets/css/header.css";
import "../../assets/css/style.css";

const HeaderAdmin = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "0px",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
    marginLeft: 0,
    width: "100%",
    fontWeight: "400",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      // padding: theme.spacing(0.7, 0.7, 0.7, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "90%",
        "&:focus": {
          width: "90%",
        },
      },
    },
  }));

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [getNotification, setGetNotification] = useState([]);

  const open = Boolean(anchorEl);
  const openNotify = Boolean(anchorE2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotify = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleNotifyClose = () => {
    setAnchorE2(null);
  };
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        // sx={{ border: "2px solid red" }}
      >
        <Grid item>
          {/* <Search className="search-order">
            <SearchIconWrapper>
              <SearchIcon className="g_color fs20px" />
            </SearchIconWrapper>
            <StyledInputBase
              className="Search_input fs16px fontWeight700"
              placeholder="Search here..."
              inputProps={{ "aria-label": "search" }}
              // onChange={(e) => handleSearch(e.target.value)}
            />
          </Search> */}
        </Grid>
        <Grid item sx={{ columnGap: "1rem" }} className="flex">
          <Grid item sx={{ columnGap: "1rem" }} className="flex">
            {" "}
            <Button
              className="fs14px  Transform_Capital fontWeight500 d_color Greenborder p_l-r10-30px bRadius_8 "
              onClick={() => {
                navigate("/admin/site-management");
              }}
            >
              Device Management
            </Button>
            {/* <Button
              className="fs14px  Transform_Capital fontWeight500 d_color Greenborder p_l-r10-30px bRadius_8 "
              onClick={() => {
                navigate("/admin/livestock");
              }}
            >
              Livestock Management
            </Button> */}
            <Button
              className="fs14px  Transform_Capital fontWeight500 d_color Greenborder p_l-r10-30px bRadius_8 "
              onClick={() => {
                navigate("/admin/user-management");
              }}
            >
              User Management
            </Button>{" "}
          </Grid>

          <Grid item className="flex center ">
            {" "}
            <NotificationsNoneIcon
              className=" g_color fs24px "
              onClick={handleNotify}
            />
          </Grid>

          <Grid
            item
            sx={{
              border: "1px solid silver",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              columnGap: "10px",
              padding: "5px",
              borderRadius: "5px",
            }}
            onClick={handleClick}
          >
            <BiMenu className="icon" fontSize={22} />
            <FaRegUserCircle
              className="icon"
              fontSize={22}
              // onClick={handleClick}
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
            width: 210,
            backgroundColor: "#B58B5D",
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
          <Typography className="fs16px white_color">Hello Admin</Typography>
        </MenuItem>
        <Divider style={{ background: "white" }} />
        <MenuItem
          dense={true}
          className="flex  white_color fs16px "
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          {/* <AccountTreeIcon /> */}
          <img src={Dash} alt="" style={{ height: "15px" }} />
          <Typography className="fs14px ml10px"> Dashboard</Typography>
        </MenuItem>

        <MenuItem
          dense={true}
          className="flex  white_color fs16px "
          onClick={() => {
            navigate("/admin/site-management");
          }}
        >
          <DnsIcon />
          <Typography className="fs14px ml10px "> Device Management</Typography>
        </MenuItem>
        <MenuItem
          dense={true}
          className="flex  white_color fs16px "
          onClick={() => {
            navigate("/admin/livestock");
          }}
        >
          <DnsIcon />
          <Typography className="fs14px ml10px ">
            {" "}
            Livestock Management
          </Typography>
        </MenuItem>

        <MenuItem
          dense={true}
          className="flex  white_color fs16px "
          onClick={() => {
            navigate("/admin/user-management");
          }}
        >
          {/* <DnsIcon /> */}
          <img src={people} alt="" style={{ height: "15px" }} />

          <Typography className="fs14px ml10px "> User Management</Typography>
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

      <Menu
        anchorEl={anchorE2}
        id="account-menu"
        open={openNotify}
        onClose={handleNotifyClose}
        onClick={handleNotifyClose}
        PaperProps={{
          // width: '200px',
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,

            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ zIndex: "20000" }}
        className="header-menu-ul"
      >
        <Grid container sx={{ height: "460px", width: "400px" }}>
          <Grid
            container
            item
            xs={12}
            justifyContent="flexStart"
            sx={{
              padding: "10px",
              background: "#fff",
              borderBottom: "1px solid #ddd",
              boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography className="b1c_color fs18px ">Notifications</Typography>
            {/* <button
              className="notification_btn blackcolor484848 fs16px "
              onClick={() => navigate("/notifications")}
            >
              See all
            </button> */}
          </Grid>

          <Grid
            container
            xs={12}
            // className="notification_scroll_div"
            sx={{
              height: "400px",
              background: "#fff",
              color: "black",
              padding: "10px 0",
              overflow: "auto",
            }}
            direction="column"
            gap="5px"
          >
            {getNotification && getNotification.length > 0 ? (
              getNotification?.map((a, i) => (
                <Grid
                  container
                  key={i}
                  item
                  onClick={() => {
                    // changeStatusNotification(a);
                  }}
                  sx={{
                    cursor: "pointer",
                    height: "70px",
                  }}
                >
                  <Grid
                    container
                    item
                    xs={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      src={a?.image}
                      style={{
                        width: "50px",
                        borderRadius: "50%",
                        height: "50px",
                      }}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    xs={10}
                    direction="column"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography className="notification_msg">
                        {"Order" + " " + a?.status}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className="notification_msg">
                        {a?.message + " " + a?.orderId}
                      </Typography>
                    </Grid>
                    {/* <Grid item>
                      <Typography className="fs12px">{a?._id}</Typography>
                    </Grid> */}
                    {/* <Grid item>
                      <Typography className="fs12px">
                        {a && moment(a.receivedTime).format("lll")}
                      </Typography>
                    </Grid> */}
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", height: "100%" }}
                direction="column"
              >
                <Grid container justifyContent="center">
                  {" "}
                  <img
                    src={GIF}
                    alt="notification"
                    style={{ width: "150px" }}
                  />
                </Grid>

                <Typography className="fs20px">
                  No notifications to show yet
                </Typography>
                <Typography className=" fs16px" sx={{ color: "#6D787D" }}>
                  You’ll see useful information here soon.
                </Typography>
                <Typography className=" fs16px" sx={{ color: "#6D787D" }}>
                  Stay tuned!
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Menu>
    </>
  );
};

export default HeaderAdmin;
