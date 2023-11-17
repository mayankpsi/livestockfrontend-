import React from "react";
import { Paper, Stack, Typography, TextField, Box } from "@mui/material";
import { BtnGroup } from "../../ComponentsV2";
import { ButtonPrimary } from "../../ComponentsV2/themeComponents";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signUpSchema } from "../../utils/validationSchema";
import { DashboardNoData } from "../../assets";
import {btnData} from "./Data";
import "./index.css";


const ShowForm = ({
  setShowAnim,
  isLogin,
  handleUserCredentialChange,
  handleUserSignUpCredentialChange,
  handleUserLoginSubmit,
  handleUserSignUpSubmit,
  onUserLogin,
  onUserSignUp,
}) => {
  const theme = useTheme();
  const isLoginActive = isLogin === "log in";
  const schema = isLoginActive ? loginSchema : signUpSchema;

  const {
    register,
    handleSubmit,
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
      placeholder={placeholder}
      InputProps={{ sx: { borderRadius: "0 !important" } }}
      {...register(name, { required: true })}
      onChange={onInputChange}
      error={errors?.[name] ? true : false}
      helperText={errors?.[name]?.message}
    />
  );
  const submit = isLoginActive ? handleUserLoginSubmit : handleUserSignUpSubmit;
  const change = isLoginActive
    ? handleUserCredentialChange
    : handleUserSignUpCredentialChange;
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Paper
        elevation={4}
        sx={{
          minWidth: isLoginActive?352:600,
          minHeight: 460,
          p: theme.spacing(4, 5),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(3),
          backgroundColor: `rgba(255,255,255,0.3)`,
        }}
      >
        <BtnGroup
          btnData={btnData}
          activeBtn={isLogin}
          onChange={setShowAnim}
        />
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
        <Stack width={"100%"} gap={theme.spacing(2)}>
          {isLoginActive ? (
            <>
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
            </>
          ) : (
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
              <Stack  direction="row" gap={2}>
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
          )}
          {isLoginActive ? (
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
          ) : null}
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
            {isLoginActive ? "log in" : "get started"}
          </ButtonPrimary>
          <Box
            display={"flex"}
            justifyContent={"center"}
            gap={theme.spacing(0.5)}
          >
            <Typography variant="h6" component="h2" sx={{ color: "#fff" }}>
              {isLoginActive
                ? "Don't have an account?"
                : "Already have an account?"}
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
                const upadtedState = isLoginActive ? "sign up" : "log in";
                setShowAnim(upadtedState);
              }}
            >
              {isLoginActive ? "Sign up" : "Sign in"}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </form>
  );
};

export default ShowForm;
