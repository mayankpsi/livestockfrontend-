import React from "react";
import { Logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography, Button, createTheme } from "@mui/material";
import { SidebarComp } from "../themeComponents";
import { routes } from "./routeData";

const Sidebar = () => {
  const navigate = useNavigate();
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
        <Box component="img" sx={{ width: 200 }} alt="logo" src={Logo} />
        <Typography
          variant="h2"
          sx={{
            fontSize: "1.6rem",
            textAlign: "center",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Livestock MONITORING
        </Typography>
      </Box>
      <Stack>
        {routes?.map((link, ind) => (
          <Button
            key={ind}
            onClick={() => handleClick(link.link)}
            sx={buttonStyles(link)}
            startIcon={<link.icon fontSize="large" />}
          >
            {link.title}
          </Button>
        ))}
      </Stack>
    </SidebarComp>
  );
};

export default Sidebar;
