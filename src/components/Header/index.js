import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  InputBase,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DnsIcon from "@mui/icons-material/Dns";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

import Dash from "../../assets/images/dashboard.png";

import { BiMenu, BiBell } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";

import { styled } from "@mui/material/styles";

const Header = () => {
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
        // sx={{ border: "1px solid red" }}
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

        <Grid
          container
          item
          // classname=" flex flexEnd"
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
              // border: "1px solid silver",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
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
