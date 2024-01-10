import {
  Stack,
  TextField,
  Box,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { TypographyPrimary } from "../../ComponentsV2/themeComponents";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showProfileSchema } from "../../utils/validationSchema";
import useProfileContext from "../../hooks/useProfileContext";
import { useEffect } from "react";

const common = {
  fontSize: "1.5rem",
  letterSpacing: 0.5,
  textTransform: "capitalize",
  fontWeight: 600,
  margin: "10px 0",
  padding: "10px 20px",
  borderRadius: "10px",
};

const ButtonPrimary = styled(Button)({
  ...common,
  background: "#B58B5D",
  "&:hover": {
    background: "#C6A580",
    color: "#fff",
  },
});

const ButtonOutlined = styled(Button)({
  ...common,
  color: "#B58B5D",
  marginRight: "10px",
  borderColor: "#B58B5D",
  "&:hover": {
    background: "#fff",
    borderColor: "#C6A580",
  },
});
const ShowProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(showProfileSchema) });

  const { editProfile, setEditProfile, pinCodeLoading } = useProfileContext();

  const getTextFiled = (
    label,
    name,
    value,
    type,
    disable,
    inputError,
    inputLoading
  ) => {
    return (
      <TextField
        fullWidth
        select={type === "select" ? true : false}
        id={name}
        label={label}
        type={type}
        disabled={disable}
        variant="outlined"
        size="large"
        sx={{ mr: 1 }}
        value={value}
        name={name}
        InputProps={{
          endAdornment: inputLoading ? (
            <InputAdornment position="end" sx={{ cursor: "pointer" }}>
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
        }}
        {...register(name, { required: true })}
        onChange={handleProfileChange}
        error={errors?.[name] || inputError?.error}
        helperText={errors?.[name]?.message || inputError?.errorMessage}
        placeholder={`Please Enter your ${label}`}
        multiline={type === "textArea" ? true : false}
        rows={type === "textArea" ? 6 : 2}
        maxRows={type === "textArea" ? 11 : 2}
      />
    );
  };

  const {
    showProfileData,
    handleProfileChange,
    handleProfileEdit,
    inputError,
    handleAccountDelete,
  } = useProfileContext();

  useEffect(() => {
    setValue("pincode", showProfileData?.pincode);
    setValue("address", showProfileData?.address);
    setValue("email", showProfileData?.email);
    setValue("phoneNumber", showProfileData?.phoneNumber);
    setValue("fullName", showProfileData?.fullName);
  }, [showProfileData, pinCodeLoading]);

  // connection request -> with a note 
  // follow people to create audience 
  // starting two lines should be attractive - keep it short and crisp 
  // make it interactive - add image also if needed
  // use hashtags - max 5
  // post every single day

  // Beauty of programming 

  return (
    <Stack width="100%">
      <TypographyPrimary sx={{ fontSize: "2rem" }}>Profile</TypographyPrimary>
      <form onSubmit={handleSubmit(handleProfileEdit)}>
        <Stack>
          <Stack
            gap={3}
            p="20px 15px"
            borderRadius={"10px"}
            border="1px solid #dddddd"
          >
            <Box display="flex" gap={5}>
              {getTextFiled(
                "Full Name",
                "fullName",
                showProfileData.fullName,
                "textField",
                editProfile
              )}
              {getTextFiled(
                "Email",
                "email",
                showProfileData?.email,
                "email",
                true
              )}
            </Box>
            <Box display="flex" gap={5}>
              {getTextFiled(
                "Phone Number",
                "phoneNumber",
                showProfileData?.phoneNumber,
                "number",
                true
              )}
              {getTextFiled(
                "Pincode",
                "pincode",
                showProfileData?.pincode,
                "number",
                editProfile,
                inputError,
                pinCodeLoading
              )}
            </Box>
            <Box display="flex" gap={5}>
              <Box width="100%" display="flex" flexWrap="wrap">
                {getTextFiled(
                  "Full Address",
                  "address",
                  showProfileData?.address,
                  "textArea",
                  editProfile
                )}
              </Box>
              <Box width="100%" display="flex" flexWrap="wrap" gap={3}>
                {getTextFiled(
                  "State",
                  "state",
                  showProfileData?.state,
                  "textField",
                  true
                )}
                {getTextFiled(
                  "Country",
                  "country",
                  showProfileData?.country,
                  "textField",
                  true
                )}
              </Box>
            </Box>
          </Stack>
          <Box display="flex" justifyContent="flex-end" mt={5}>
            {editProfile ? (
              <>
                <ButtonOutlined
                  variant="outlined"
                  sx={{ minWidth: "100px" }}
                  onClick={handleAccountDelete}
                >
                  Delete Profile
                </ButtonOutlined>
                <ButtonPrimary
                  variant="contained"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditProfile(false);
                  }}
                >
                  Edit Profile
                </ButtonPrimary>
              </>
            ) : (
              <>
                <ButtonOutlined
                  variant="outlined"
                  sx={{ minWidth: "100px" }}
                  onClick={() => setEditProfile(true)}
                >
                  Cancel Changes
                </ButtonOutlined>
                <ButtonPrimary
                  variant="contained"
                  type="submit"
                  onClick={() => {}}
                >
                  Save Changes
                </ButtonPrimary>
              </>
            )}
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default ShowProfile;
