import React from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  useJsApiLoader,
  Circle,
} from "@react-google-maps/api";
import { Mark } from "../assets";
import useMapContext from "../hooks/useMapContext";

const MAP_KEY = "AIzaSyBoq0tt73i_mEUB4gsGN8_ClQpD9d9RqFE";
const GetMap = ({
  mapWidth,
  mapHeight,
  isLivestocks,
  livestockData,
  geofenceCoordinates,
}) => {
  const { getGeolocationAddress } = useMapContext();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds({
    //   lat: Number(geofenceCoordinates?.lat),
    //   lng: Number(geofenceCoordinates?.lng),
    // });
    // map.fitBounds(bounds);
    map.setZoom(18)

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: mapWidth,
        height: mapHeight,
      }}
      onClick={(e) =>
        !geofenceCoordinates?.address
          ? getGeolocationAddress(false, e.latLng.lat(), e.latLng.lng())
          : null
      }
      center={{
        lat: Number(geofenceCoordinates?.lat),
        lng: Number(geofenceCoordinates?.lng),
      }}
      defaultZoom={15}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {isLivestocks &&
        livestockData &&
        livestockData?.map(({ id, position }) => (
          <Marker
            key={id}
            position={position}
            icon={{
              url: Mark,
              scaledSize:
                window && window.google && new window.google.maps.Size(30, 30),
            }}
          />
        ))}
      <Marker
        key="dcdcde323ddccddc3ded3de"
        title="marker"
        position={{
          lat: Number(geofenceCoordinates?.lat),
          lng: Number(geofenceCoordinates?.lng),
        }}
      />
      <Circle
        center={{
          lat: Number(geofenceCoordinates?.lat),
          lng: Number(geofenceCoordinates?.lng),
        }}
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
  ) : null;
};

export default GetMap;
