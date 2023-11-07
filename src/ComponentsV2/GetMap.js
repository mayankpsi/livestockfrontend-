import React from "react";
import { GoogleMap, Marker, LoadScript, Circle } from "@react-google-maps/api";
import { Mark } from "../assets";
import useMapContext from "../hooks/useMapContext";

const center = {
  lat: 28.515733361162216,
  lng: 77.37178971104055,
};

const MAP_KEY = "AIzaSyBoq0tt73i_mEUB4gsGN8_ClQpD9d9RqFE";
const GetMap = ({
  mapWidth,
  mapHeight,
  isLivestocks,
  livestockData,
  geofenceCoordinates,
}) => {
  const { getGeolocationAddress } = useMapContext();
  return (
    <LoadScript googleMapsApiKey={MAP_KEY}>
      <GoogleMap
        mapContainerStyle={{
          width: mapWidth,
          height: mapHeight,
        }}
        onClick={(e) =>
          getGeolocationAddress(false, e.latLng.lat(), e.latLng.lng())
        }
        defaultCenter={center}
        center={{lat:geofenceCoordinates?.lat, lng:geofenceCoordinates?.lng}}
        zoom={18}
      >
        {isLivestocks &&
          livestockData &&
          livestockData?.map(({ id, position }) => (
            <Marker
              key={id}
              position={position}
              // options={{
              //   icon:{
              //     url: Mark,
              //     scaledSize: { width: "32px", height: "32px" },
              //     size:5
              //   }
              // }}
              icon={{
                url: require("../assets/images/cow1.png"),
                scaledSize:
                  window &&
                  window.google &&
                  new window.google.maps.Size(30, 30),
              }}
            />
          ))}
        <Marker
          key="helloworlds"
          title="marker"
          position={{lat:geofenceCoordinates?.lat, lng:geofenceCoordinates?.lng}}
        />
        <Circle
          center={{lat:geofenceCoordinates?.lat, lng:geofenceCoordinates?.lng}}
          options={{
            strokeColor: "#06B95F",
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: "#06B95F",
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: geofenceCoordinates?.radius,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default GetMap;
