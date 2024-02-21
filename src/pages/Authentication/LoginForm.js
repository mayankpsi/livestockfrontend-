import React, { useEffect } from "react";
import {
  Paper,
  Stack,
  Typography,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import { BtnGroup } from "../../ComponentsV2";
import { ButtonPrimary } from "../../ComponentsV2/themeComponents";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationSchema";
import { DashboardNoData } from "../../assets";
import { btnData } from "./Data";
import { VisibilityOutlinedIcon } from "../../icons";
import "./index.css";
import { useState } from "react";
import Logo from "./Logo";

const LoginForm = ({
  setShowAnim,
  isLogin,
  handleUserCredentialChange,
  handleUserLoginSubmit,
  onUserLogin,
}) => {
  const theme = useTheme();
  const schema = loginSchema;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
  const submit = handleUserLoginSubmit;
  const change = handleUserCredentialChange;

  useEffect(() => {
    setValue("email", onUserLogin?.email);
    setValue("password", onUserLogin?.password);
  }, [onUserLogin]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Paper
        elevation={4}
        sx={{
          minWidth: 352,
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
          {getInput(
            "Enter Email",
            false,
            "email",
            false,
            "Email",
            onUserLogin?.email,
            change
          )}
          {getInput(
            "Enter Password",
            false,
            "password",
            false,
            "password",
            onUserLogin?.password,
            change
          )}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "right",
              cursor: "pointer",
            }}
          >
            Forget password?
          </Typography>
        </Stack>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={theme.spacing(1)}
        >
          <ButtonPrimary
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
            log in
          </ButtonPrimary>
          <Box
            display={"flex"}
            justifyContent={"center"}
            gap={theme.spacing(0.5)}
          >
            <Typography variant="h6" component="h2" sx={{ color: "#fff" }}>
              Don't have an account?
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
                setShowAnim("sign up");
              }}
            >
              Sign up
            </Typography>
          </Box>
        </Box>
      </Paper>
    </form>
  );
};

export default LoginForm;
