import { Stack, CircularProgress} from '@mui/material';

const Spinner = () => {
  return (
    <Stack
    width={"100%"}
    height={"100%"}
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
  >
    <CircularProgress size={50}/>
    </Stack>
  );
}

export default Spinner;
