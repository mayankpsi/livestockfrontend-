import { Box, Typography } from "@mui/material";
import { DashboardNoData } from "../../assets";

const Logo = () => {
  return (
    <>
      <Box
        component="img"
        sx={{
          width: 150,
          height: 150,
          objectFit: "cover",
          borderRadius: "10px",
        }}
        src={DashboardNoData}
        alt="livestock-monitoring-logo"
      />
      <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
        Livestock Monitoring
      </Typography>
    </>
  );
};

export default Logo;
