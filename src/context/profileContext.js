import { useState, createContext, useEffect } from "react";
import { request } from "../apis/axios-utils";
import axios from "axios";
import useErrorMessage from "../hooks/useErrorMessage";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [showProfileData, setShowProfileData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    pincode: "",
    state: "",
    country: "",
  });

  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [editProfile, setEditProfile] = useState(true);
  const [inputError, setInputError] = useState({
    error: false,
    errorMessage: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState({
    open: false,
    confirmBtn: false,
  });
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);
  const [pinCodeLoading, setPinCodeLoading] = useState(false)
  const {getErrorMessage} = useErrorMessage();

  // HANDLE PROFILE CHANGE AND UPDATE
  const handleProfileChange = (data) => {
    const { name, value } = data.target;
    setShowProfileData({ ...showProfileData, [name]: value });
  };

  const handleProfileEdit = async () => {
    const body = {
      name: showProfileData?.fullName,
      address: {
        line: showProfileData?.address,
        pincode: showProfileData?.pincode,
        state: showProfileData?.state,
        country: showProfileData?.country,
      },
    };
    if (!inputError.error) {
      setOpenBackdropLoader(true);
      try {
        const res = await request({
          url: `/auth/update-user`,
          method: "PATCH",
          data: body,
        });
        if (res.status === 200) {
          setEditProfile(true);
          setOpenBackdropLoader(false);
          openSnackbarAlert("success","Profile successfully edited");
        } else {
          throw new Error(getErrorMessage(res));
        }
      } catch (error) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("error",error?.message);
      }
    }
  };

  // HANDLE PASSWORD CHANGE
  const handlePasswordChange = (data) => {
    const { name, value } = data.target;
    setChangePassword({ ...changePassword, [name]: value });
  };

  const handlePasswordEdit = async () => {
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/auth/changePassword`,
        method: "POST",
        data: changePassword,
      });
      if (res.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success","Password successfully changed");
      } else {
        throw new Error(getErrorMessage(res))
      }
    } catch (error) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error",error?.message);
    }
  };

  useEffect(() => {
    setOpenBackdropLoader(true)
    request({ url: `/auth/getUpdatedUserData` })
      .then((res) => {
        if (res.status === 200) {
          setOpenBackdropLoader(false)
          const { data } = res?.data;
          setShowProfileData({
            ...showProfileData,
            fullName: data?.name,
            email: data?.email,
            phoneNumber: data?.phone,
            address: data?.address?.line,
            pincode: data?.address?.pincode,
            state: data?.address?.state,
            country: data?.address?.country,
          });
        } else {
          throw new Error(getErrorMessage(res))
        }
      })
      .catch((err) =>  {
        setOpenBackdropLoader(false)
        openSnackbarAlert("error", err.message)
      });
  }, []);

  useEffect(() => {
    const delayDebounceFnc = showProfileData?.pincode
      ? setTimeout(() => {
        setPinCodeLoading(true)
          axios
            .get(
              `https://api.postalpincode.in/pincode/${showProfileData?.pincode}`
            )
            .then((res) => {
              if (res?.data[0]?.PostOffice) {
                //set the state and country
                setShowProfileData({
                  ...showProfileData,
                  state: res?.data[0]?.PostOffice[0]?.State,
                  country: res?.data[0]?.PostOffice[0]?.Country,
                });
                // res.data[0].PostOffice[0].State
                // res.data[0].PostOffice[0].Country
                setInputError({ error: false, errorMessage: "" });
              } else {
                setShowProfileData({
                  ...showProfileData,
                  state: "",
                  country: "",
                });
                setInputError({
                  error: true,
                  errorMessage: "Pin code not found",
                });
              }
            })
            .catch((err) => console.log(err))
            .finally(()=> setPinCodeLoading(false))
        }, 1000)
      : null;
    return () => clearTimeout(delayDebounceFnc);
  }, [showProfileData?.pincode]);

  const handleConfirmWindowClose = () => {
    setShowConfirmModal({ open: false, confirmBtn: false });
  };

  const openSnackbarAlert = (type, message) => {
    setSnackbarAlert({
      open: true,
      type,
      message,
    });
  };

  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  const handleAccountDelete = () => {
    setShowConfirmModal({ open: true, confirmBtn: true });
  };
  const handleConfirmAccountDelete = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    try {
      const res = await request({
        url: `/user/deleteAccount`,
        method: "DELETE",
      });
      if (res?.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "Account successfully deleted!");
        if(window){
          window.location.pathname = "/login";
        }
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", err.message);
    }
  };

  const handleProfileSaveChanges = () => {
    const body = {
      name: showProfileData?.fullName,
      email: showProfileData?.email,
      pincode: showProfileData?.pincode,
      address: {
        lin: showProfileData?.address,
        state: showProfileData?.state,
        country: showProfileData?.country,
      },
    };
    // try {
    //   const res = request({
    //     url: `/auth/update-user`,
    //     method: "PATCH",
    //     data: body,
    //   });
    //   if (res.status === 200) {
    //   } else {
    //   }
    // } catch (error) {}
  };

  return (
    <ProfileContext.Provider
      value={{
        showProfileData,
        changePassword,
        handlePasswordEdit,
        handleProfileChange,
        handleProfileEdit,
        handlePasswordChange,
        editProfile,
        setEditProfile,
        setShowProfileData,
        inputError,
        showConfirmModal,
        handleConfirmWindowClose,
        handleAccountDelete,
        handleConfirmAccountDelete,
        snackbarAlert,
        onSnackbarAlertClose,
        openBackdropLoader,
        pinCodeLoading
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
