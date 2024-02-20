import { Stack, Box, TextField, Button } from "@mui/material";
import { TypographyPrimary } from "../../ComponentsV2/themeComponents";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { securityProfileSchema } from "../../utils/validationSchema";
import useProfileContext from "../../hooks/useProfileContext";

const common = {
  fontSize: "1.5rem",
  letterSpacing: 0.5,
  textTransform: "capitalize",
  fontWeight: 600,
  margin: "10px 0",
  padding: "10px 20px",
  borderRadius: "10px",
  "&:hover": {
    background: "#C6A580",
    color: "#fff",
  },
};

const ButtonPrimary = styled(Button)({
  ...common,
  background: "#B58B5D",
});

const ProfileSecurity = () => {
  const { changePassword, handlePasswordChange, handlePasswordEdit } =
    useProfileContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(securityProfileSchema) });

  const getTextFiled = (label, name, value) => {
    return (
      <TextField
        fullWidth
        // disabled
        id={name}
        label={label}
        variant="outlined"
        size="large"
        sx={{ mr: 1 }}
        value={value}
        name={name}
        placeholder={`Please Enter your ${label}`}
        {...register(name, { required: true })}
        onChange={handlePasswordChange}
        error={errors?.[name]}
        helperText={errors?.[name]?.message}
      ></TextField>
    );
  };
  return (
    <Stack width="100%">
      <TypographyPrimary sx={{ fontSize: "2rem" }}>
        Change Password
      </TypographyPrimary>
      <form onSubmit={handleSubmit(handlePasswordEdit)}>
        <Stack gap={2} p="20px 0">
          <Box display="flex" gap={2}>
            {getTextFiled(
              "Current Password",
              "currentPassword",
              changePassword?.currentPassword
            )}
            {getTextFiled(
              "New Password",
              "newPassword",
              changePassword?.newPassword
            )}
            {getTextFiled(
              "Confirm Password",
              "confirmPassword",
              changePassword?.confirmPassword
            )}
          </Box>
          <Box>
            <ButtonPrimary
              variant="contained"
              type="submit"
              //   onClick={handleGeofenceSave}
            >
              Change Password
            </ButtonPrimary>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default ProfileSecurity;
