import React, { useReact, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Mark from "../../assets/images/pointer.png";
const containerStyle = {
  width: "100%",
  height: "665px",
};
const center = {
  lat: 28.5355,
  lng: 77.391,
};
const Analytics = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCchikomkJ-Rjx7UMibYM00rjEcufRPSzU",
  });
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <>
            {
              <Marker
                key={"lol"}
                icon={Mark}
                position={{ lat: center.lat, lng: center.lng }}
              />
            }
          </>
        </GoogleMap>
      ) : (
        <div> </div>
      )}
    </>
  );
};

export default Analytics;
