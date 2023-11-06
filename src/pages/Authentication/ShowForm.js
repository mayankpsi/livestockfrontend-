import React from "react";
import { Paper, Stack, Typography, TextField, Box } from "@mui/material";
import { BtnGroup } from "../../ComponentsV2";
import { ButtonPrimary } from "../../ComponentsV2/themeComponents";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signUpSchema } from "../../utils/validationSchema";

import "./index.css";

const btnData = [
  {
    label: "log in",
  },
  {
    label: "sign up",
  },
];

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
          minWidth: 352,
          minHeight: 460,
          p: theme.spacing(4, 5),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(3),
          backgroundColor:`rgba(255,255,255,0.3)`
        }}
      >
        <BtnGroup
          btnData={btnData}
          activeBtn={isLogin}
          onChange={setShowAnim}
        />
        <Typography variant="h3" component="h1">
          {isLoginActive ? "Welcome Back!" : "Sign up"}
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
            <Typography variant="h6" component="h2">
              {isLoginActive
                ? "Don't have an account?"
                : "Already have an account?"}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
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
