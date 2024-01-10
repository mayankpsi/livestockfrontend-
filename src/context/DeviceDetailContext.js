import React, { createContext, useContext, useState } from "react";
import useErrorMessage from "../hooks/useErrorMessage";
import useCollarContext from "../hooks/useCollarContext";
import { request } from "../apis/axios-utils";

const DeviceDetailContext = createContext();

export const DeviceDetailContextProvider = ({ children }) => {
  const [isEditCollarInfo, setIsEditCollarInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collarInfoEdit, setCollarInfoEdit] = useState({
    collarUID: "",
    collarName: "",
    collarMacId: "",
  });

  const { getErrorMessage } = useErrorMessage();

  const { isError, setIsError, openSnackbarAlert } = useCollarContext();

  const handleCollarInfoEditChange = (e) => {
    const { name, value } = e.target;
    setCollarInfoEdit({ ...collarInfoEdit, [name]: value });
  };

  const handelCollarNewInfo = async (deviceId) => {
    setIsEditCollarInfo(true);
    if (isEditCollarInfo) {
      setLoading(true);
      const body = {
        deviceName: collarInfoEdit?.collarName,
        uID: collarInfoEdit?.collarUID,
        macID: collarInfoEdit?.collarMacId,
      };
      try {
        const editRes = await request({
          url: `/devices/update?deviceID=${deviceId}`,
          method: "PATCH",
          data: body,
        });
        if (editRes.status === 200) {
          openSnackbarAlert("success", "Collar successfully edited :)");
          setIsEditCollarInfo(false);
          setIsError({
            error: false,
            message: null,
          });
        } else if (editRes?.response?.data?.statusCode === 409) {
          setIsError({
            error: true,
            message: editRes?.response?.data?.message,
          });
        } else {
          throw new Error(getErrorMessage(editRes));
        }
      } catch (err) {
        openSnackbarAlert("error", err.message);
        setIsEditCollarInfo(false);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <DeviceDetailContext.Provider
      value={{
        loading,
        handelCollarNewInfo,
        handleCollarInfoEditChange,
        collarInfoEdit,
        setCollarInfoEdit,
        isEditCollarInfo,
      }}
    >
      {children}
    </DeviceDetailContext.Provider>
  );
};

export const useDeviceDetailContext = () => useContext(DeviceDetailContext);
