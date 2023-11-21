import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Box, Button, Typography, Badge, Divider, IconButton,styled, createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiAvatar from "@mui/material/Avatar";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiMenu from "@mui/material/Menu";
import { NotificationsNoneIcon } from "../icons";
import { NoNotifications } from "../ComponentsV2";

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

  const handleViewAll = () => {
    navigate("/notifications");
    setAnchorEl(null);
  };
  const data = [
    {
      name: "notification",
      sensor: "sensor",
      createdAt: "createdAt",
      order_ref: {
        name: "order_ref-name",
      },
    },
    {
      name: "notification1",
      sensor: "sensor",
      createdAt: "createdAt",
      order_ref: {
        name: "order_ref-name",
      },
    },
    {
      name: "notification 2",
      sensor: "sensor",
      createdAt: "createdAt",
      order_ref: {
        name: "order_ref-name",
      },
    },
  ];
  return (
    <Fragment>
      <IconButton
        color="inherit"
        aria-haspopup="true"
        onClick={handleDropdownOpen}
        aria-controls="customized-menu"
      >
        <Badge className="badge" max={999} badgeContent={10} color="primary">
          <NotificationsNoneIcon fontSize="large" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            my: 2,
          }}
        >
          <Typography
            align="center"
            sx={{ fontSize: "1.5rem", fontWeight: 600, width: "100%" }}
          >
            Notifications
          </Typography>
        </Box>
        <Divider />
        <ScrollWrapper>
          {data?.length > 0 ? (
            <>
              {data?.map((item, index) => {
                return (
                  <>
                    <MenuItem
                      //   onClick={() => changeReadStatus(item)}
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
              })}
            </>
          ) : (
           <NoNotifications/>
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
              fontSize: "1.2rem",
              //   border: `1px solid ${"#fff"}`,
              //   "&:hover": {
              //     backgroundColor: "#5932EA" || "transparent",
              //   },
            }}
            onClick={handleViewAll}
          >
            View All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
export default AlertsDropdown;
