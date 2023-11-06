import { createContext, useState, useEffect } from "react";
import { fetchGeofenceAddress, createGeofence } from "../apis/geofenceServices";
import { request } from "../apis/axios-utils";
import useUserId from "../hooks/useUserId";

export const MapContext = createContext();

export const MapContentProvider = ({ children }) => {
  const [userLiveLocation, setUserLiveLocation] = useState({
    lat:null,
    lng:null,
    radius:null,
  });
  const [detectLocation, setDetectLocation] = useState(true);
  const [saveLocationData, setSaveLocationData] = useState(false);
  const [onGeofenceEdit, setOnGeofenceEdit] = useState(false);
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);

  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

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

  // auto detect the location of the user
  const detectAutoLocation = () => {
    if ("geolocation" in navigator) {
      navigator?.geolocation?.getCurrentPosition(function (position) {
        setUserLiveLocation({
          ...userLiveLocation,
          lat: position?.coords?.latitude,
          lng: position?.coords?.longitude,
        });
      });
    } else {
      // alert("Error:Make sure to allow location access");
    }
    setDetectLocation(false);
  };

  //geofence
  const [geofenceCoordinates, setGeofenceCoordinates] = useState({
    lat: null,
    lng: null,
    address: "",
    radius: null,
    err: null,
  });

  const getAddress = async (latitude, longitude) => {
    try {
      const res = await request({
        url: `/user/getAaddress?lat=${latitude}&lng=${longitude}`,
      });
      if (res?.status === 200) {
        const { data } = res?.data;
        setGeofenceCoordinates({
          ...geofenceCoordinates,
          lat: data?.lat,
          lng: data?.lng,
          address: data?.Address,
        });
      } else {
        const message = res?.response?.statusText || "Something went wrong :(";
        throw new Error(message);
      }
    } catch (error) {
      openSnackbarAlert("error",error.message)
    }

    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  // GET GEOFENCE ADDRESS BY LAT AND LNG
  const getGeolocationAddress = async (autoDetect, latitude, longitude) => {
    setIsLoading(true);
    if (autoDetect) {
      if ("geolocation" in navigator) {
        navigator?.geolocation?.getCurrentPosition(async (position) => {
          let { latitude, longitude } = position?.coords;
          getAddress(latitude, longitude);
        });
      } else {
        // alert("Error:Make sure to allow location access");
        setIsLoading(false);
      }
    } else {
      getAddress(latitude, longitude);
    }
  };

  const [editedRadius, setEditedRadius] = useState(null);

  // HANDLE GEOFENCE ADDRESS EDIT
  const handleGeofenceAddressEdit = () => {
    setGeofenceCoordinates({
      ...geofenceCoordinates,
      lat: 26.84039,
      lng: 80.94731,
      address: "",
    });
  };

  const userId = useUserId();
  //HANDEL GEOFENCE SUBMIT AND CREATE A GEOFENCE
  const handleCreateGeofence = async () => {
    localStorage.setItem("geofenceCreation", "showEdit");
    setSaveLocationData(true);
    const body = {
      Address: geofenceCoordinates?.address,
      lat: geofenceCoordinates?.lat,
      lng: geofenceCoordinates?.lng,
      radius: geofenceCoordinates?.radius,
    };
    const res = await request({
      url: `/user/addGeofence/?userId=${userId}`,
      method: "POST",
      data: body,
    });
    if (res?.status === 200) {
      // alert(res.data.message);
    } else {
      // alert(res.data.data.message);
    }
  };

  //HANDLE GEOFENCE EDIT CANCEL
  const handleGeofenceCancel = () => {
    setGeofenceCoordinates({ ...geofenceCoordinates, radius: editedRadius });
    setEditedRadius(null);
    setOnGeofenceEdit(false);
    setSaveLocationData(true);
    localStorage.setItem("geofenceCreation", "showEdit");
  };

  //HANDLE GEOFENCE EDIT SAVE
  const handleGeofenceSave = () => {
    setOnGeofenceEdit(false);
    setSaveLocationData(true);
    handleCreateGeofence();
    localStorage.setItem("geofenceCreation", "showEdit");
  };
  //HANDLE GEOFENCE EDIT
  const handleGeofenceEdit = () => {
    setOnGeofenceEdit(true);
    setSaveLocationData(false);
    setEditedRadius(geofenceCoordinates?.radius);
    localStorage.setItem("geofenceCreation", "editTrue");
  };

  //GET GEOFENCE DETAILS
  useEffect(() => {
    setOpenBackdropLoader(true)
    request({ url: `/user/getUsersGeofence?userID=${userId}` })
      .then((res) => {
        const { data } = res?.data;
        const formattedData = {
          lat: data.lat,
          lng: data.lng,
          address: data.Address,
          radius: data.radius,
          err: null,
        };
        setGeofenceCoordinates(formattedData);
      })
      .catch((err) => {
        // alert(err.message)
      })
      .finally(() => setOpenBackdropLoader(false));
  }, []);

  return (
    <MapContext.Provider
      value={{
        detectAutoLocation,
        userLiveLocation,
        setUserLiveLocation,
        detectLocation,
        setDetectLocation,
        saveLocationData,
        setSaveLocationData,
        onGeofenceEdit,
        setOnGeofenceEdit,
        getGeolocationAddress,
        isLoading,
        geofenceCoordinates,
        handleGeofenceAddressEdit,
        handleCreateGeofence,
        setGeofenceCoordinates,
        setEditedRadius,
        handleGeofenceSave,
        handleGeofenceCancel,
        handleGeofenceEdit,
        snackbarAlert,
        onSnackbarAlertClose,
        openSnackbarAlert,
        openBackdropLoader
      }}
    >
      {children}
    </MapContext.Provider>
  );
};