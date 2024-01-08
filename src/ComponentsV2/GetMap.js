import React from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Circle,
} from "@react-google-maps/api";
import { SafeLivestockPointer, UnsafeLivestock, UnsafeLivestockPointer } from "../assets";
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
    map.setZoom(15);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const getLivestockImg = (status) =>
    status?.toLowerCase() === "safe"
      ? SafeLivestockPointer
      : UnsafeLivestockPointer;

  const livestocks = [
    {
      id: 1,
      position: {
        lat: 28.599094523998755,
        lng: 77.35961422896632,
      },
      safeUnsafeStatus: "safe",
    },
    {
      id: 2,
      position: {
        lat: 28.5974004071597,
        lng: 77.35972773033218,
      },
      safeUnsafeStatus: "safe",
    },
    {
      id: 3,
      position: {
        lat: 28.595374074683324,
        lng: 77.35866838425076,
      },
      safeUnsafeStatus: "safe",
    },
    {
      id: 4,
      position: {
        lat: 28.595440512433118,
        lng: 77.35605785283583,
      },
      safeUnsafeStatus: "safe",
    },
    {
      id: 5,
      position: {
        lat: 28.5974004071597,
        lng: 77.35537684464063,
      },
      safeUnsafeStatus: "safe",
    },
    {
      id: 6,
      position: {
        lat: 28.598762346378756,
        lng: 77.35662535966516,
      },
      safeUnsafeStatus: "safe",
    },
    {
      id: 7,
      position: {
        lat: 28.59949313575679,
        lng: 77.35673886103103,
      },
      safeUnsafeStatus: "safe",
    },
    {
      id: 8,
      position: {
        lat: 28.59906130628401,
        lng: 77.3588953869825,
      },
      safeUnsafeStatus: "safe",
    },
    {
      id: 9,
      position: {
        lat: 28.597068224185072,
        lng: 77.35840354773042,
      },
      safeUnsafeStatus: "safe",
    },
    {
      id: 10,
      position: {
        lat:28.602084075329785,lng: 77.35499850675441
      },
      safeUnsafeStatus: "unsafe",
    },
    {
      id:11,
      position:{
       lat: 28.59411174945812, lng:77.35741986922623
      },
      safeUnsafeStatus: "safe",
    },
    {
      id: 12,
      position: {
        lat:28.595075104289517, lng:77.35121512789219
      },
      safeUnsafeStatus: "unsafe",
    },
  ];

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
        livestockData?.map(({ id, position, safeUnsafeStatus }) => (
          <Marker
            key={id}
            position={position}
            icon={{
              url: getLivestockImg(safeUnsafeStatus),
              scaledSize:
                window && window.google && new window.google.maps.Size(15, 15),
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
          radius: Math.ceil(geofenceCoordinates?.radius),
        }}
      />
    </GoogleMap>
  ) : null;
};

export default GetMap;
