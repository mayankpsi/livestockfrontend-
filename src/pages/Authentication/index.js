import React from "react";
import { Box, Stack } from "@mui/material";
import "./index.css";
import ShowForm from "./ShowForm";
import useAuthContext from "../../hooks/useAuth";
import { LoginBG } from "../../assets";
import { SnackbarAlert } from "../../ComponentsV2";
import { motion } from "framer-motion";

const AuthPage = () => {
  const {
    handleUserLoginSubmit,
    handleUserSignUpSubmit,
    onUserSignUp,
    handleUserCredentialChange,
    onUserLogin,
    handleUserSignUpCredentialChange,
    snackbarAlert,
    onSnackbarAlertClose,
    showAnim,
    setShowAnim,
    isLogin,
    setIsLogin,
  } = useAuthContext();

  return (
    <>
      <SnackbarAlert
        open={snackbarAlert?.open}
        closeAlert={onSnackbarAlertClose}
        message={snackbarAlert?.message}
        type={snackbarAlert?.type}
      />
      <Stack
        width="100%"
        height="100vh"
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundImage: `url(${LoginBG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* <motion.h1
          initial={{ x: "-1000px" }}
          animate={{ fontSize: "50px", color: "red", x: "-0" }}
        >
          hello world
        </motion.h1> */}
        <Box className="card" sx={{ minWidth: 352, minHeight: 640 }}>
          <motion.Box
            initial={{ x: "2500px" }}
            animate={{ x: "0" }}
            className={`${
              showAnim ? "animation1" : "animation2"
            } card-side card-side--front`}
          >
            <ShowForm
              showAnim={showAnim}
              setShowAnim={(ele) => {
                setIsLogin(ele);
                setShowAnim(!showAnim);
              }}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              onUserLogin={onUserLogin}
              onUserSignUp={onUserSignUp}
              handleUserCredentialChange={handleUserCredentialChange}
              handleUserSignUpCredentialChange={
                handleUserSignUpCredentialChange
              }
              handleUserLoginSubmit={handleUserLoginSubmit}
              handleUserSignUpSubmit={handleUserSignUpSubmit}
            />
          </motion.Box>
          {/* <Box
            className={`${
              showAnim ? "animation1" : "animation2"
            } card-side card-side--back`}
          >
            <ShowForm
              showAnim={showAnim}
              setShowAnim={(ele) => {
                setIsLogin(ele);
                setShowAnim(!showAnim);
              }}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              onUserLogin={onUserLogin}
              onUserSignUp={onUserSignUp}
              handleUserCredentialChange={handleUserCredentialChange}
              handleUserSignUpCredentialChange={
                handleUserSignUpCredentialChange
              }
              handleUserLoginSubmit={handleUserLoginSubmit}
              handleUserSignUpSubmit={handleUserSignUpSubmit}
            />
          </Box> */}
        </Box>
      </Stack>
    </>
  );
};

export default AuthPage;
