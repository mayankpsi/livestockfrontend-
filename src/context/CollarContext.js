import { useState, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { CustomLabel } from "../ComponentsV2";
import { VisibilityOutlinedIcon, DeleteOutlineOutlinedIcon } from "../icons";
import { request } from "../apis/axios-utils";
import useDateFormat from "../hooks/useDateFormat";
import useErrorMessage from "../hooks/useErrorMessage";

export const CollarContext = createContext();

export const CollarContextProvider = ({ children }) => {
  const { getErrorMessage } = useErrorMessage();
  const navigate = useNavigate();
  const { formattedDate } = useDateFormat();
  const [activeDevice, setActiveDevice] = useState("collar");
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
  const [deviceDataLength, setDeviceDataLength] = useState(0);
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const [paginationPageAssigned, setPaginationPageAssigned] = useState(1);
  const [paginationPageNotAssigned, setPaginationPageNotAssigned] = useState(1);
  const [pedometerPagination, setPedometerPagination] = useState(1);
  const [pedometerPaginationPageAssigned, setPedometerPaginationPageAssigned] =
    useState(1);

  const [
    pedometerPaginationPageNotAssigned,
    setPedometerPaginationPageNotAssigned,
  ] = useState(1);

  //HANDLE COLLAR MODAL CLOSE
  const handleCollarModalClose = () => {
    setOpenAddCollarModal(false);
    setNewCollar({ collarUID: "", collarName: "", collarMacId: "" });
  };

  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const getPagination = (device, status) => {
    const label = status?.toString()?.toLowerCase();
    if (device?.toLowerCase() === "collar") {
      if (label === "all") return paginationPageNo;
      else if (label === "true") return paginationPageAssigned;
      else if (label === "false") return paginationPageNotAssigned;
      else return paginationPageNo;
    } else if (device?.toLowerCase() === "pedometer") {
      if (label === "all") return pedometerPagination;
      else if (label === "true") return pedometerPaginationPageAssigned;
      else if (label === "false") return pedometerPaginationPageNotAssigned;
      else return pedometerPagination;
    }
  };

  const deviceCapitalized =
    activeDevice?.charAt(0)?.toUpperCase() +
    activeDevice?.slice(1)?.toLowerCase();

  // GET ALL DEVICES
  const getAllDevices = (status) => {
    setOpenBackdropLoader(true);
    const pag = getPagination(activeDevice, status);
    request({
      url: `/devices/getDeviceByUserId?deviceType=${activeDevice}&page=${pag}&limit=${10}&status=${status}`,
    })
      .then((res) => {
        if (res.status === 200) {
          const { dataLength, deviceData } = res?.data?.data;
          const formattedData = deviceData?.map((col) => ({
            id: col._id + "_id_",
            collarID: col.uID,
            collarName: col.deviceName,
            power: (
              <CustomLabel
                text={col?.deviceActiveStatus ? "ON" : "OFF"}
                type={col?.deviceActiveStatus ? "success" : "error"}
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
                  navigate(`/devices/${activeDevice}/${col?._id}`);
                  localStorage.setItem("currentTab", 0);
                }}
              />,
              <DeleteOutlineOutlinedIcon
                fontSize="large"
                onClick={() => handleCollarDelete(col?._id, col?.status)}
              />,
            ],
          }));
          setDeviceDataLength(dataLength);
          setCollars(formattedData);
        } else {
          setDeviceDataLength(0);
          setCollars([]);
          throw new Error(res);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  // HANDLE ADD COLLAR
  const handleAddCollarChange = (data) => {
    const { name, value } = data.target;
    setNewCollar({ ...newCollar, [name]: value });
  };

  const handleAddCollar = async (type) => {
    setIsLoading(true);
    const body = {
      uID: newCollar?.collarUID?.toString(),
      deviceName: newCollar?.collarName,
      macID: newCollar?.collarMacId,
      deviceType: type,
    };
    const res = await request({
      url: "/devices/create",
      method: "POST",
      data: body,
    });
    if (res?.status === 200) {
      handleAddCollarModalClose();
      openSnackbarAlert(
        "success",
        `${deviceCapitalized} successfully created!`
      );
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
      openSnackbarAlert(
        "success",
        `${deviceCapitalized} successfully deleted!`
      );
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
        activeDevice,
        setActiveDevice,
        deviceDataLength,
        paginationPageNo,
        setPaginationPageNo,
        pedometerPagination,
        setPedometerPagination,
        getAllDevices,
        paginationPageAssigned,
        setPaginationPageAssigned,
        paginationPageNotAssigned,
        setPaginationPageNotAssigned,
        pedometerPaginationPageAssigned,
        setPedometerPaginationPageAssigned,
        pedometerPaginationPageNotAssigned,
        setPedometerPaginationPageNotAssigned,
      }}
    >
      {children}
    </CollarContext.Provider>
  );
};
