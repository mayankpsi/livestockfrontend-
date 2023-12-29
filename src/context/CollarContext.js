import { useState, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { CustomLabel } from "../ComponentsV2";
import { VisibilityOutlinedIcon, DeleteOutlineOutlinedIcon } from "../icons";
import { request } from "../apis/axios-utils";
import useUserId from "../hooks/useUserId";
import useDateFormat from "../hooks/useDateFormat";
import useErrorMessage from "../hooks/useErrorMessage";

export const CollarContext = createContext();

export const CollarContextProvider = ({ children }) => {
  const {getErrorMessage} = useErrorMessage()
  const navigate = useNavigate();
  const { formattedDate } = useDateFormat();

  const [collars, setCollars] = useState([]);
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [modalContentType, setModalContentType] = useState("add");

  const [newCollar, setNewCollar] = useState({
    collarUID: "",
    collarName: "",
    collarMacId: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState({
    open: false,
    confirmBtn: false,
  });

  //COLLAR MODAL
  const [openAddCollarModal, setOpenAddCollarModal] = useState(false);
  const handleCollarModalOpen = (type) => {
    setModalContentType(type);
    setOpenAddCollarModal(true);
  };
  const [deleteCollarId, setDeleteCollarId] = useState();

  //BACKDROP
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);

  //GET USER ID
  const userId = useUserId();

  //HANDLE COLLAR MODAL CLOSE
  const handleCollarModalClose = () => setOpenAddCollarModal(false);

  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  //GET ALL COLLARS
  useEffect(() => {
    setOpenBackdropLoader(true);
    request({ url: `/devices/getDeviceByUserId?userID=${userId}` })
      .then((res) => {
        const formattedData = res?.data?.data?.map((col) => ({
          id: col._id + "id",
          collarID: col.uID,
          collarName: col.deviceName,
          power: (
            <CustomLabel
              text={col?.wifiStatus ? "ON" : "OFF"}
              type={col?.wifiStatus ? "success" : "error"}
              width={80}
              marginAuto={true}
            />
          ),
          currentStatus: (
            <CustomLabel
              text={col?.status ? "assigned" : "not assigned"}
              type={col?.status ? "success" : "error"}
              width={125}
              marginAuto={true}
            />
          ),
          status: col?.status ? "assigned" : "not assigned",
          addedOn: formattedDate(col?.createdAt, false),
          action: [
            <VisibilityOutlinedIcon
              fontSize="large"
              onClick={() => {
                setOpenBackdropLoader(true);
                navigate(`/devices/collars/${col?._id}`);
              }}
            />,
            <DeleteOutlineOutlinedIcon
              fontSize="large"
              onClick={() => handleCollarDelete(col?._id, col?.status)}
            />,
          ],
        }));
        setCollars(formattedData);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  }, [isLoading]);

  // HANDLE ADD COLLAR
  const handleAddCollarChange = (data) => {
    const { name, value } = data.target;
    setNewCollar({ ...newCollar, [name]: value });
  };

  const handleAddCollar = async () => {
    setIsLoading(true);
    const body = {
      uID: newCollar?.collarUID?.toString(),
      deviceName: newCollar?.collarName,
      macID: newCollar?.collarMacId,
    };
    const res = await request({
      url: "/devices/create",
      method: "POST",
      data: body,
    });
    if (res?.status === 200) {
      handleAddCollarModalClose();
      openSnackbarAlert("success", "Collar successfully created!");
    } else {
      if (res?.response?.status === 409) {
        setIsError({
          error: true,
          message: getErrorMessage(res),
        });
      } else {
        const msg = res?.message || getErrorMessage(res);
        openSnackbarAlert("error", msg);
      }
    }
    setIsLoading(false);
  };

  // handle add collar modal close
  const handleAddCollarModalClose = () => {
    handleCollarModalClose();
    setNewCollar({
      collarUID: "",
      collarName: "",
      collarMacId: "",
    });
    setIsError({ error: false, message: "" });
  };

  //Delete collar
  const handleCollarDelete = async (collarId, isLivestockAssigned) => {
    if (isLivestockAssigned) {
      setShowConfirmModal({ open: true, confirmBtn: false });
    } else {
      setShowConfirmModal({ open: true, confirmBtn: true });
    }
    setDeleteCollarId(collarId);
  };

  const handleConfirmWindowClose = () => {
    setShowConfirmModal({ open: false, confirmBtn: false });
  };

  const handleCollarDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    const res = await request({
      url: `/devices/delete?deviceID=${deleteCollarId}`,
      method: "DELETE",
    });
    if (res?.status === 200) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("success", "Collar successfully deleted!");
      setTimeout(() => window.location.reload(), 500);
    } else {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", getErrorMessage(res));
    }
  };

  //Snackbar alert
  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  const openSnackbarAlert = (type, message) => {
    setSnackbarAlert({
      open: true,
      type,
      message,
    });
  };

  return (
    <CollarContext.Provider
      value={{
        handleAddCollarChange,
        handleAddCollar,
        newCollar,
        collars,
        setCollars,
        isError,
        openAddCollarModal,
        handleCollarModalOpen,
        handleCollarModalClose,
        handleAddCollarModalClose,
        isLoading,
        modalContentType,
        handleCollarDelete,
        openBackdropLoader,
        setOpenBackdropLoader,
        setIsError,
        showConfirmModal,
        handleConfirmWindowClose,
        handleCollarDeleteConfirm,
        snackbarAlert,
        onSnackbarAlertClose,
        openSnackbarAlert,
      }}
    >
      {children}
    </CollarContext.Provider>
  );
};
