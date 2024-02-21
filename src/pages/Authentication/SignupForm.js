import React, { useEffect } from "react";
import {
  Paper,
  Stack,
  Typography,
  TextField,
  Box,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Logo from "./Logo";
import { BtnGroup } from "../../ComponentsV2";
import { ButtonPrimary } from "../../ComponentsV2/themeComponents";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validationSchema";
import { btnData } from "./Data";
import { VisibilityOutlinedIcon } from "../../icons";
import "./index.css";
import { useState } from "react";
import useSignup from "./hooks/useSignup";
import useAuthContext from "../../hooks/useAuth";

const SignupForm = ({
  setShowAnim,
  isLogin,
  handleUserSignUpCredentialChange,
  handleUserSignUpSubmit,
  onUserSignUp,
}) => {
  const theme = useTheme();
  const schema = signUpSchema;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { setOTPVerification, resendTimer } = useAuthContext();

  const { isSigning, signUp } = useSignup();

  useEffect(() => {
    setValue("fullName", onUserSignUp?.fullName);
    setValue("email", onUserSignUp?.email);
    setValue("password", onUserSignUp?.password);
    setValue("phone", onUserSignUp?.phone);
  }, [onUserSignUp]);

  const getInput = (
    placeholder,
    disabled,
    name,
    select,
    label,
    value,
    onInputChange
  ) => (
    <TextField
      sx={{ background: "#fff", textTransform: "capitalize" }}
      disabled={disabled}
      fullWidth
      id={name}
      select={select}
      label={label}
      variant="outlined"
      size="large"
      value={value}
      name={name}
      type={name === "password" && !showPassword ? "password" : "text"}
      placeholder={placeholder}
      InputProps={{
        sx: { borderRadius: "0 !important" },
        endAdornment:
          name === "password" ? (
            <InputAdornment
              position="end"
              onClick={() => setShowPassword(!showPassword)}
            >
              <VisibilityOutlinedIcon />
            </InputAdornment>
          ) : null,
      }}
      {...register(name, { required: true })}
      onChange={onInputChange}
      error={errors?.[name] ? true : false}
      helperText={errors?.[name]?.message}
    />
  );
  // const submit = handleUserSignUpSubmit;
  const change = handleUserSignUpCredentialChange;

  const onSubmit = () => {
    const body = {
      name: onUserSignUp?.fullName,
      email: onUserSignUp?.email,
      countryCode: "91",
      phone: onUserSignUp?.phone,
      password: onUserSignUp?.password,
    };

    signUp(body, {
      onSuccess: (data) => {
        if (data.status === 200) {
          setOTPVerification(true);
          resendTimer();
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        elevation={4}
        sx={{
          minWidth: 600,
          minHeight: 460,
          p: theme.spacing(4, 5),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(3),
          backgroundColor: `rgba(255,255,255,0.3)`,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%,-50%)`,
        }}
      >
        <BtnGroup
          btnData={btnData}
          activeBtn={isLogin}
          onChange={setShowAnim}
        />
        <Logo />
        <Stack width={"100%"} gap={theme.spacing(2)}>
          <>
            <Stack direction="row" gap={2}>
              {getInput(
                "Full Name",
                false,
                "fullName",
                false,
                "Full Name",
                onUserSignUp?.fullName,
                change
              )}
              {getInput(
                "Enter Email",
                false,
                "email",
                false,
                "Email",
                onUserSignUp?.email,
                change
              )}
            </Stack>
            <Stack direction="row" gap={2}>
              {getInput(
                "Phone",
                false,
                "phone",
                false,
                "phone",
                onUserSignUp?.phone,
                change
              )}
              {getInput(
                "Enter Password",
                false,
                "password",
                false,
                "password",
                onUserSignUp?.password,
                change
              )}
            </Stack>
          </>
        </Stack>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={theme.spacing(1)}
        >
          <ButtonPrimary
            disabled={isSigning}
            startIcon={
              isSigning ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : null
            }
            sx={{
              width: "100%",
              fontSize: "2rem",
              textTransform: "uppercase",
              letterSpacing: "3px",
              display: "flex",
              justifyContent: "center",
              p: theme.spacing(1, 0),
            }}
            type="submit"
          >
            get started
          </ButtonPrimary>
          <Box
            display={"flex"}
            justifyContent={"center"}
            gap={theme.spacing(0.5)}
          >
            <Typography variant="h6" component="h2" sx={{ color: "#fff" }}>
              Already have an account?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                cursor: "pointer",
              }}
              component="span"
              onClick={() => {
                setShowAnim("log in");
              }}
            >
              Sign in
            </Typography>
          </Box>
        </Box>
      </Paper>
    </form>
  );
};

export default SignupForm;
