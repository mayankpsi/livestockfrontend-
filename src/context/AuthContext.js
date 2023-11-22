import { createContext, useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { request } from "../apis/axios-utils";
import useSocket from "../hooks/useSocket";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useSocket();
  
  const from = location.state?.from?.pathname || "/";
  const [userData, setUserData] = useState({ data: {}, error: "" });
  const [onUserLogin, setOnUserLogin] = useState({ email: "", password: "" });
  const [onUserSignUp, setOnUserSignUp] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });
  // show anime
  const [showAnim, setShowAnim] = useState(true);
  const [isLogin, setIsLogin] = useState("log in");

  //Snackbar alert
  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  //Snackbar show alert
  const showSnackbarAlert = (type, message) => {
    setSnackbarAlert({ open: true, type, message });
  };

  // HANDLE USER LOGIN
  const handleUserCredentialChange = (event) => {
    const { name, value } = event.target;
    setOnUserLogin({ ...onUserLogin, [name]: value });
  };

  useEffect(() => {
    socket.on("connection", () => {
      console.log("connected to server");
    });
  }, []);
  const handleUserLoginSubmit = async () => {
    const body = {
      email: onUserLogin?.email,
      password: onUserLogin?.password,
    };
    try {
      const res = await request({
        url: "/auth/sign-in",
        method: "POST",
        data: body,
      });
      if (res?.status === 200) {
        // res.data.data.statusCode -- 200 success
        // accessToken - res.data.data.accessToken
        // accessToken - res.data.data.user._id
        const loginCredentials = {
          accessToken: res.data.data.accessToken,
          userId: res.data.data.user._id,
          userName: res.data.data.user.name,
        };
        socket.emit("login", { userId: res.data.data.user._id });
        localStorage.setItem("userData", JSON.stringify(loginCredentials));
        setOnUserLogin({ email: "", password: "" });
        navigate(from, { replace: true });
        window.location.reload();
      } else if (res?.response?.data?.statusCode === 401) {
        //res.response.data.statusCode - 401 - email not registered
        // res.response.data.statusCode - 401 - incorrect password
        showSnackbarAlert("error", res?.response?.data?.message);
      } else {
        const message =
          res?.response?.data?.message || "Something went wrong :(";
        throw new Error(message);
      }
    } catch (err) {
      showSnackbarAlert("error", err?.message);
    }
  };

  //HANDLE USER SIGN UP
  const handleUserSignUpCredentialChange = (event) => {
    const { name, value } = event.target;
    setOnUserSignUp({ ...onUserSignUp, [name]: value });
  };

  const handleUserSignUpSubmit = async () => {
    const body = {
      name: onUserSignUp?.fullName,
      email: onUserSignUp?.email,
      phone: onUserSignUp?.phone,
      password: onUserSignUp?.password,
    };
    try {
      const res = await request({
        url: "/auth/sign-up",
        method: "POST",
        data: body,
      });
      if (res?.status === 200) {
        showSnackbarAlert("success", "Account successfully created!");
        setShowAnim(!showAnim);
        setIsLogin("log in");
        setOnUserSignUp({
          fullName: "",
          email: "",
          password: "",
          phone: "",
        });
        // handle complete profile show modal only one time
        localStorage.setItem("showProfileCompleteModal", "true");
      } else if (res?.response?.data?.statusCode === 403) {
        // EMAIL OR PHONE ALREADY REGISTERED
        showSnackbarAlert("error", res?.response?.data?.message);
      } else {
        //ALL OTHER ERRORS
        const message =
          res?.response?.data?.message || "Something went wrong :(";
        throw new Error(message);
      }
    } catch (err) {
      showSnackbarAlert("error", err?.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleUserLoginSubmit,
        handleUserSignUpSubmit,
        onUserSignUp,
        userData,
        handleUserSignUpCredentialChange,
        handleUserCredentialChange,
        onUserLogin,
        snackbarAlert,
        onSnackbarAlertClose,
        showAnim,
        setShowAnim,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
