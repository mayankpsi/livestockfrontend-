import React from "react";
import {
  DashboardNoData as Logo,
  LivestockSidebar,
  LivestockSidebarFade,
} from "../../assets";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography, Button, createTheme } from "@mui/material";
import { SidebarComp } from "../themeComponents";
import { routes } from "./routeData";
import useUserId from "../../hooks/useUserId";

const Sidebar = () => {
  const navigate = useNavigate();
  const currentRole = Number(
    JSON.parse(window?.localStorage?.getItem("userData"))?.role
  );
  const theme = createTheme();

  const isActivePath = (link) =>
    window?.location?.pathname?.split("/")[1] === link.slice(1);
  const buttonStyles = (route) => ({
    background: `${isActivePath(route.link) ? "#C6A580" : "none"}`,
    fontSize: "1.5rem",
    color: `${isActivePath(route.link) ? "#fff" : "#696969"}`,
    padding: "15px 0 15px 45px",
    fontWeight: "bold",
    borderRadius: 0,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    margin: "5px 0",
    display: "flex",
    justifyContent: "left",
    "&:hover": {
      background: `${isActivePath(route.link) ? "#C6A580" : "none"}`,
    },
  });

  const handleClick = (link) => {
    localStorage.setItem("currentTab", 0);
    navigate(link);
  };

  const handleIcons = (link) => {
    const isLivestock = link.title === "livestocks";
    return isLivestock ? (
      <img
        src={isActivePath(link.link) ? LivestockSidebar : LivestockSidebarFade}
      />
    ) : (
      <link.icon fontSize="large" />
    );
  };

  return (
    <SidebarComp>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: theme.spacing(2),
        }}
      >
        <Box
          component="img"
          sx={{ width: 130, my: theme.spacing(2) }}
          alt="logo"
          src={Logo}
        />
        <Typography
          variant="h2"
          sx={{
            fontSize: "1.6rem",
            textAlign: "center",
            fontWeight: "bold",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          Livestock MONITORING
        </Typography>
      </Box>
      <Stack>
        {routes
          ?.filter((ele) => ele?.role?.includes(currentRole))
          ?.map((link, ind) => (
            <Button
              key={ind}
              onClick={() => handleClick(link.link)}
              sx={buttonStyles(link)}
              startIcon={handleIcons(link)}
            >
              {link.title}
            </Button>
          ))}
      </Stack>
    </SidebarComp>
  );
};

export default Sidebar;
