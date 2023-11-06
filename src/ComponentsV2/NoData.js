import { Box, Stack } from "@mui/material";
import { NoDataImg } from "../assets";


const NoData = () => {
  return (
    <Stack width="100%" direction="row" justifyContent="center" py={5}>
    <Box component="img" width={400} height={400} src={NoDataImg}/>
  </Stack>
  );
}

export default NoData;
