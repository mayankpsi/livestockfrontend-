import { Box, Stack } from "@mui/material";
import { TypographyPrimary } from "../../../../ComponentsV2/themeComponents";
import { LivestockCoverPhoto } from "../../../../assets";
import CustomTextField from "../../../Authentication/ui/CustomTextField";

const LivestockInfo = ({ data }) => {
  return (
    <Stack
      width="100%"
      sx={{ background: "#F7F8FD", p: 2, pt: 0, borderRadius: "10px" }}
    >
      <TypographyPrimary>Livestock Information</TypographyPrimary>
      <Stack direction={"row"} width="100%">
        <Stack width="40%">
          <img
            style={{
              height: "25vh",
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src={LivestockCoverPhoto}
            alt="livestock image"
          />
        </Stack>
        <Stack
          width="60%"
          px={2}
          py={0.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box display={"flex"} sx={{ display: "flex", gap: 2 }}>
            <CustomTextField
              disabled={true}
              label={"Livestock UID"}
              value={data?.uID || "N/A"}
            />
            <CustomTextField
              disabled={true}
              label={"Livestock name"}
              value={data?.name || "N/A"}
            />
          </Box>
          <Box display={"flex"} sx={{ display: "flex", gap: 2 }}>
            <CustomTextField
              disabled={true}
              label={"Age"}
              value={data?.age || "N/A"}
            />
            <CustomTextField
              disabled={true}
              label={"Breed"}
              value={data?.breed || "N/A"}
            />
          </Box>
          <Box display={"flex"} sx={{ display: "flex", gap: 2 }}>
            <CustomTextField
              disabled={true}
              label={"Gender"}
              value={data?.gender || "N/A"}
            />
            <CustomTextField
              disabled={true}
              label={"Color"}
              value={data?.color || "N/A"}
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LivestockInfo;
