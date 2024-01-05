import { Stack } from "@mui/material";
import { AddCircleOutlineOutlinedIcon } from "../icons";
import { ButtonPrimary, TypographyPrimary } from "./themeComponents";
import Spinner from "./Spinner";

const AddBtn = ({ text1, text2, onClick, loading }) => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: { lg: "30%", md: "50%", sm: "70%" },
        border: "1px solid #dddddd",
        borderRadius: "10px",
      }}
    >
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ p: 2, width: "100%" }}
        height="100%"
      >
        <AddCircleOutlineOutlinedIcon
          sx={{ fontSize: 150, cursor: "default" }}
        />
        <TypographyPrimary sx={{ textAlign: "center" }}>
          Assign this {text2} to available {text1}.
        </TypographyPrimary>
        <TypographyPrimary sx={{ textAlign: "center", m: 0 }}>
          Note : If no {text1} is available then go to {text1} management - Add
          new {text1}
        </TypographyPrimary>
        <ButtonPrimary
          disabled={loading}
          sx={{
            width: "100%",
            py: 1,
            fontSize: "1.5rem",
            display: "flex",
            justifyContent: "center",
            mt: 4.5,
          }}
          startIcon={
            loading ? <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} /> : null
          }
          onClick={onClick}
        >
          Assign {text1}
        </ButtonPrimary>
      </Stack>
    </Stack>
  );
};

export default AddBtn;
