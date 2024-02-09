import { createContext, useState, useEffect } from "react";
import { request } from "../apis/axios-utils";
import useUserId from "../hooks/useUserId";
import useErrorMessage from "../hooks/useErrorMessage";

export const MapContext = createContext();

export const MapContentProvider = ({ children }) => {
  const [userLiveLocation, setUserLiveLocation] = useState({
    lat: null,
    lng: null,
    radius: null,
  });
  const [detectLocation, setDetectLocation] = useState(true);
  const [saveLocationData, setSaveLocationData] = useState(false);
  const [onGeofenceEdit, setOnGeofenceEdit] = useState(false);
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customError, setCustomError] = useState({
    error: false,
    message: null,
  });
  const [geoFenceType, setGeoFenceType] = useState(null);
  const [polygonPath, setPolygonPath] = useState([]);
  const [circleGeoFence, setCircleGeoFence] = useState({
    radius: 0,
    position: null,
  });
  const [isGeoFenceSave, setIsGeoFenceSaved] = useState(false);
  const { getErrorMessage } = useErrorMessage();

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

  const addCustomError = (message) => {
    setCustomError({ error: true, message });
  };

  const removeCustomError = () => {
    setCustomError({ error: false, message: null });
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
        const message = getErrorMessage(res);
        throw new Error(message);
      }
      setOpenBackdropLoader(false);
    } catch (error) {
      openSnackbarAlert("error", error.message);
      setOpenBackdropLoader(false);
    }

    setIsLoading(false);
  };

  const getCoordinates = () => {
    return new Promise(function (resolve, reject) {
      navigator?.geolocation?.getCurrentPosition(resolve, reject);
    });
  };

  // GET GEOFENCE ADDRESS BY LAT AND LNG
  const getGeolocationAddress = async (autoDetect, latitude, longitude) => {
    setOpenBackdropLoader(true);
    setIsLoading(true);
    if (autoDetect) {
      getCoordinates()
        .then((position) => {
          if (position?.coords) {
            let { latitude, longitude } = position?.coords;
            getAddress(latitude, longitude);
          }
        })
        .catch((err) => {
          setOpenBackdropLoader(false);
          openSnackbarAlert("error", err.message);
          setIsLoading(false);
        });
      // console.log(position,"djbhdbhbhbhbbhbhbhbhbhbhb")
      // if (position?.coords) {
      //   let { latitude, longitude } = position?.coords;
      //   getAddress(latitude, longitude);
      // }
      // console.log(position,"jsbhbhbhbhbhbhhbhhbhbhbhbhbh");
      // if ("geolocation" in navigator) {
      //   // console.log(navigator?.geolocation?.getCurrentPosition,"jsbhbhbhbhbhbhhbhhbhbhbhbhbh")
      //    navigator?.geolocation?.getCurrentPosition(async (position) => {
      //     let { latitude, longitude } = position?.coords;
      //     getAddress(latitude, longitude);
      //   });
      // } else {
      //   setIsLoading(false);
      //   setOpenBackdropLoader(false);
      //   openSnackbarAlert("error", "Error: Make sure you enable location");
      // }
    } else {
      getAddress(latitude, longitude);
    }
  };

  const [editedRadius, setEditedRadius] = useState(null);

  // HANDLE GEOFENCE ADDRESS EDIT
  const handleGeofenceAddressEdit = () => {
    setGeofenceCoordinates({
      ...geofenceCoordinates,
      lat: 28.597300752377528,
      lng: 77.35768470574658,
      address: "",
      radius: null,
    });
  };

  const userId = useUserId();
  //HANDEL GEOFENCE SUBMIT AND CREATE A GEOFENCE
  const handleCreateGeofence = async () => {
    setOpenBackdropLoader(true);
    setSaveLocationData(true);
    // geoFenceType, polygonPath, circleGeoFence
    localStorage.setItem("geofenceCreation", "showEdit");
    const circleBody = {
      Address: geofenceCoordinates?.address,
      centerLat: geofenceCoordinates?.lat,
      centerLng: geofenceCoordinates?.lng,
      radius: circleGeoFence?.radius,
    };

    const body = {
      Address: geofenceCoordinates?.address,
      lat: geofenceCoordinates?.lat,
      lng: geofenceCoordinates?.lng,
      radius: geofenceCoordinates?.radius,
    };
    const polygonBody = {
      Address: geofenceCoordinates?.address,
      centerLat: geofenceCoordinates?.lat,
      centerLng: geofenceCoordinates?.lng,
      coordinates: polygonPath,
    };
    try {
      const res = await request({
        url: `/user/addGeofence/?userId=${userId}`,
        method: "POST",
        data: body,
      });
      if (res?.status === 200) {
        openSnackbarAlert("success", res?.data?.message);
        setOpenBackdropLoader(false);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      openSnackbarAlert("error", error?.message);
      setOpenBackdropLoader(false);
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
    setOpenBackdropLoader(true);
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
        openBackdropLoader,
        customError,
        addCustomError,
        removeCustomError,
        polygonPath,
        setPolygonPath,
        circleGeoFence,
        setCircleGeoFence,
        geoFenceType,
        setGeoFenceType,
        isGeoFenceSave,
        setIsGeoFenceSaved,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
