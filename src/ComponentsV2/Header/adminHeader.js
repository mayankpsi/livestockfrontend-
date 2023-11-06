import React, { useState } from "react";
import { Grid, Box, Stack } from "@mui/material";
import { NotificationsNoneIcon } from "../../icons";
import "../../assets/css/header.css";
import "../../assets/css/style.css";
import { SidebarSmall, SearchInput, ProfileMenu } from "../";

const HeaderAdmin = () => {
  const [anchorE2, setAnchorE2] = useState(null);

  const handleNotify = (event) => {
    setAnchorE2(event.currentTarget);
  };

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        sx={{ padding: "10px", paddingRight: 6 }}
      >
        <Box sx={{ display: { lg: "none", md: "inline" } }}>
          <SidebarSmall />
        </Box>
        <Stack width="30%" pl={4}>
          <SearchInput
            placeholder="Search Livestock Name..."
            onChange={() => {}}
          />
        </Stack>
        <Grid item sx={{ columnGap: "1rem" }} className="flex">
          <Grid item className="flex center ">
            <NotificationsNoneIcon
              className=" g_color fs24px "
              onClick={handleNotify}
            />
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ProfileMenu />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HeaderAdmin;
