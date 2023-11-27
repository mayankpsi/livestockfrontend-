import { createContext, useState, useEffect } from "react";
import { VisibilityOutlinedIcon, DeleteOutlineOutlinedIcon } from "../icons";
import { CustomLabel } from "../ComponentsV2";
import { useNavigate } from "react-router-dom";
import { request } from "../apis/axios-utils";
import useDateFormat from "../hooks/useDateFormat";
import { ConstructionOutlined } from "@mui/icons-material";

export const LivestockContext = createContext();

export const LivestockContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [allLivestocks, setAllLivestocks] = useState([]);
  const [modalContentType, setModalContentType] = useState("add");
  const [openAddLiveStockModal, setOpenAddLivestockModal] = useState(false);
  const [showLocationTab, setShowLocationTab] = useState("location");
  const [isError, setIsError] = useState({ error: false, message: "" });
  // new livestock
  const [addNewLivestock, setAddNewLivestock] = useState({
    collarUID: "",
    livestockUID: "",
    livestockName: "",
    livestockGender: "",
  });
  const [addNewLivestockLoading, setAddNewLivestockLoading] = useState(false);

  //BACKDROP
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);

  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  //CONFIRM MODAL
  const [showConfirmModal, setShowConfirmModal] = useState({
    open: false,
    confirmBtn: false,
  });

  const [deleteLivestockId, setDeleteLivestockId] = useState(null);
  const [alertDeletedId, setAlertDeletedId] = useState({
    id: null,
    type: null,
  });
  const { formattedDate } = useDateFormat();
  const [liveStockImage, setLiveStockImage] = useState(null);

  // PAGINATION AND RANGE DATE
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [alertsDataLength, setAlertsDataLength] = useState(0);
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const pageLimit = 10;

  //GET ALL LIVESTOCK
  useEffect(() => {
    setOpenBackdropLoader(true);
    request({ url: "/liveStock/getAll" })
      .then((res) => {
        const formattedData = res?.data?.data?.map((col) => ({
          id: col._id + "id",
          liveStockUID: col?.uID,
          livestockName: col?.name,
          collarID: col?.assignedDevice?.uID ? col?.assignedDevice?.uID : "N/A",
          addedOn: formattedDate(col?.createdAt, false),
          status: col?.liveStocklocationStatus,
          currentStatus: (
            <CustomLabel
              text={col?.liveStocklocationStatus || "N/A"}
              type={
                col?.liveStocklocationStatus?.toLowerCase() === "safe"
                  ? "success"
                  : "error"
              }
              width={125}
              marginAuto={true}
            />
          ),
          lastUpdate: formattedDate(col?.updatedAt, true),
          action: [
            <VisibilityOutlinedIcon
              fontSize="large"
              onClick={() => navigate(`/livestocks/${col?._id}`)}
            />,
            <DeleteOutlineOutlinedIcon
              fontSize="large"
              onClick={() => handleLivestockDelete(col?._id, col?.status)}
            />,
          ],
        }));
        setAllLivestocks(formattedData);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  }, [addNewLivestockLoading]);

  // handle modal open
  const handleLivestockModalOpen = (type) => {
    setModalContentType(type);
    setOpenAddLivestockModal(true);
  };
  // handle livestock modal close
  const handleLivestockModalClose = () => setOpenAddLivestockModal(false);

  //HANDLE LIVESTOCK DELETE
  const handleLivestockDelete = async (livestockId, isCollarAssign) => {
    if (isCollarAssign) {
      setShowConfirmModal({ open: true, confirmBtn: false });
    } else {
      setShowConfirmModal({ open: true, confirmBtn: true });
    }
    setDeleteLivestockId(livestockId);
  };

  const handleLivestockDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    const res = await request({
      url: `/liveStock/delete?liveStockID=${deleteLivestockId}`,
      method: "DELETE",
    });
    if (res?.status === 200) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("success", "Livestock successfully deleted!");
      setTimeout(() => window.location.reload(), 500);
    } else {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", "Something went wrong :(");
    }
  };
  // HANDLE ADD COLLAR
  const handleAddLivestockChange = (data) => {
    const { name, value } = data.target;
    setAddNewLivestock({ ...addNewLivestock, [name]: value });
  };

  const handleAddLivestock = async () => {
    setAddNewLivestockLoading(true);
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
  }

    const formData = new FormData();
    formData.append("uID", addNewLivestock?.livestockUID);
    formData.append("name", addNewLivestock?.livestockName);
    formData.append("gender", addNewLivestock?.livestockGender);
    formData.append("deviceID", addNewLivestock?.collarUID);
    formData.append("liveStockImage", liveStockImage);

    try {
      const res = await request({
        url: "/liveStock/create",
        method: "POST",
        data: formData,
        config
      });
      if (res?.status === 200) {
        handleAddLivestockModalClose();
        const msg = res?.data?.message || "Livestock successfully Added!";
        openSnackbarAlert("success", msg);
        setTimeout(() => window.location.reload(), 500);
      } else {
        if (res?.response?.status === 409) {
          setIsError({
            error: true,
            message: res?.response?.data?.message,
          });
        } else {
          throw new Error("Something went wrong");
        }
      }
    } catch (error) {
      setAddNewLivestockLoading(false);
      const msg = error?.message || "Something went wrong :(";
      openSnackbarAlert("error", msg);
    }
  };

  const handleAddLivestockModalClose = () => {
    handleLivestockModalClose();
    setAddNewLivestock({
      collarUID: "",
      livestockUID: "",
      livestockName: "",
      livestockGender: "",
    });
    setIsError({ error: false, message: "" });
  };

  //SNACKBAR
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

  // CONFIRM MODAL
  const handleConfirmWindowClose = () => {
    setShowConfirmModal({ open: false, confirmBtn: false });
  };

  // HANDLE ALERT DELETE
  const handleAlertDelete = (id, type) => {
    if (alertsDataLength) {
      setShowConfirmModal({ open: true, confirmBtn: true });
      setAlertDeletedId({ id, type });
    } else {
      openSnackbarAlert("error", "Nothing to Clear");
    }
  };

  const handleAlertDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    try {
      const res = await request({
        url: `/liveStock/DeleteLiveStockAlerts?alertID=${alertDeletedId?.id}`,
        method: "DELETE",
      });
      if (res?.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "Alert successfully deleted!");
        setTimeout(() => window.location.reload(), 500);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      const msg = err?.message || "Something went wrong :(";
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", msg);
    }
  };

  const handleAllAlertDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    try {
      const res = await request({
        url: `/liveStock/deleteLivestockAlertsData?livestock_id=${alertDeletedId?.id}`,
        method: "DELETE",
      });
      if (res?.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "All alert successfully deleted!");
        setTimeout(() => window.location.reload(), 500);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      const msg = err?.message || "Something went wrong :(";
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", msg);
    }
  };

  return (
    <LivestockContext.Provider
      value={{
        allLivestocks,
        modalContentType,
        handleLivestockModalOpen,
        openAddLiveStockModal,
        setOpenAddLivestockModal,
        allLivestocks,
        showLocationTab,
        setShowLocationTab,
        handleLivestockModalClose,
        addNewLivestock,
        setAddNewLivestock,
        handleAddLivestockChange,
        addNewLivestockLoading,
        setAddNewLivestockLoading,
        handleAddLivestock,
        openSnackbarAlert,
        onSnackbarAlertClose,
        showConfirmModal,
        handleConfirmWindowClose,
        handleAddLivestockModalClose,
        snackbarAlert,
        onSnackbarAlertClose,
        handleLivestockDeleteConfirm,
        openSnackbarAlert,
        openBackdropLoader,
        selectedDate,
        setSelectedDate,
        paginationPageNo,
        setPaginationPageNo,
        pageCount,
        setPageCount,
        pageLimit,
        handleAlertDelete,
        handleAlertDeleteConfirm,
        alertDeletedId,
        handleAllAlertDeleteConfirm,
        setOpenBackdropLoader,
        isError,
        setIsError,
        alertsDataLength,
        setAlertsDataLength,
        setLiveStockImage,
        liveStockImage
      }}
    >
      {children}
    </LivestockContext.Provider>
  );
};
