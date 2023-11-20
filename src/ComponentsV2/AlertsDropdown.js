import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { Button, Typography, Badge, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styled, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiAvatar from "@mui/material/Avatar";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiMenu from "@mui/material/Menu";
import { FaRegBell } from "react-icons/fa";
import {NotificationImg} from "../assets";
// import PerfectScrollbarComponent from "react-perfect-scrollbar";
// import notificationImg from "../../assets/img/notification.gif";

const theme = createTheme();
const Menu = styled(MuiMenu)(({ theme }) => ({
  "& .MuiMenu-paper": {
    width: 380,
    overflow: "hidden",
    marginTop: theme.spacing(4),
    [theme?.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  "& .MuiMenu-list": {
    padding: 0,
  },
}));
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
const styles = {
  maxHeight: 349,
  overflowY: "scroll",
  "& .MuiMenuItem-root:last-of-type": {
    border: 0,
  },
};
// const PerfectScrollbar = styled(PerfectScrollbarComponent)(styles);
const Avatar = styled(MuiAvatar)`
  width: 2.375rem;
  height: 2.375rem;
  font-size: 1.125rem;
`;
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: "1 1 100%",
  overflow: "hidden",
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  marginBottom: theme.spacing(0.75),
}));
const MenuItemSubtitle = styled(Typography)`
  flex: "1 1 100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
`;
const AlertsDropdown = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const hidden = useMediaQuery(theme.breakpoints.down("lg"));
  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };
  const handleDropdownCloseWithUrl = () => {
    // if (url) {
    //   navigate(url);
    //   GetAlertDetails();
    // }
    setAnchorEl(null);
  };
  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return (
        <Box
          sx={{
            ...styles,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            ...styles,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      );
    }
  };
  return (
    <Fragment>
      <IconButton
        color="inherit"
        aria-haspopup="true"
        onClick={handleDropdownOpen}
        aria-controls="customized-menu"
      >
        <Badge
          className="badge"
          max={999}
          badgeContent={10}
        >
          <FaRegBell color="grey" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disableRipple>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography align="center" sx={{ fontWeight: 600, width: "100%" }}>
              Notifications
            </Typography>
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {10 > 0 ? (
            <>
              {/* {data?.map((item, index) => {
                return (
                  <>
                    <MenuItem
                      onClick={() => changeReadStatus(item)}
                      key={index}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar alt={item?.name} src="/images/avatars/4.png" />
                        <Box
                          sx={{
                            mx: 4,
                            flex: "1 1",
                            display: "flex",
                            overflow: "hidden",
                            flexDirection: "column",
                          }}
                        >
                          <MenuItemTitle className="tablecrow-cell-bg  ">
                            {item?.order_ref?.name}
                          </MenuItemTitle>
                          <MenuItemTitle>{item?.name}!</MenuItemTitle>
                          <MenuItemSubtitle variant="body2">
                            {item?.sensor}
                          </MenuItemSubtitle>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.disabled" }}
                        >
                          {dayjs(item?.createdAt).format("h:mm A")}
                          <br />
                          {dayjs(item?.createdAt).format("DD-MM-YYYY")}
                        </Typography>
                      </Box>
                    </MenuItem>
                  </>
                );
              })} */}
            </>
          ) : (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%", height: "40vh" }}
              direction="column"
            >
              <Grid container justifyContent="center">
                <img
                  src={NotificationImg}
                  alt="notification"
                  width={150}
                  height={150}
                />
              </Grid>
              <Typography className="fs20px">
                No notifications to show yet
              </Typography>
              <Typography
                align="center"
                className=" fs16px"
                sx={{ color: "#6D787D", width: "90%" }}
              >
                You’ll see useful information here soon. Stay tuned!
              </Typography>
            </Grid>
          )}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{
            padding: "16px 16px",
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            style={{
              color: "#fff",
              backgroundColor: "#5932EA",
              border: `1px solid ${"#fff"}`,
              "&:hover": {
                backgroundColor: "#5932EA" || "transparent",
              },
            }}
            onClick={() => handleDropdownCloseWithUrl("/notification-details")}
          >
            View All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
export default AlertsDropdown;