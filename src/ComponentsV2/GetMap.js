import React, { useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Circle,
} from "@react-google-maps/api";
import { SafeLivestockPointer, UnsafeLivestockPointer } from "../assets";
import useMapContext from "../hooks/useMapContext";
import { Skeleton } from ".";
import { Button, Stack } from "@mui/material";

const MAP_KEY = "AIzaSyBoq0tt73i_mEUB4gsGN8_ClQpD9d9RqFE";
const GetMap = ({
  mapWidth,
  mapHeight,
  isLivestocks,
  livestockData,
  geofenceCoordinates,
  createGeoFence,
}) => {
  const { getGeolocationAddress } = useMapContext();
  const circleRef = useRef();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_KEY,
    libraries: ["drawing"],
  });

  const [polygonPath, setPolygonPath] = useState([]);

  const mapRef = useRef(null);
  const drawingManagerRef = useRef(null);
  const dmPolygonRef = useRef(null);
  const finalPoly = useRef(null);

  const handlePolygonEdit = (polygon) => {
    const paths = getPolygonPaths(polygon);
    setPolygonPath(paths);
  };

  const getPolygonPaths = (polygon) => {
    const polyArray = polygon.getPath().getArray();
    const paths = [];
    polyArray.forEach((path) => {
      paths.push({ lat: path.lat(), lng: path.lng() });
    });
    return paths;
  };

  const onPolygonComplete = (event) => {
    if (event.type == window?.google.maps.drawing.OverlayType.POLYGON) {
      const polygon = event.overlay;

      // Disable drawing mode
      drawingManagerRef.current.setDrawingMode(null);

      // Allow the user to edit the drawn polygon
      polygon.setEditable(true);

      // Remove drawing control
      drawingManagerRef.current.setOptions({
        drawingControl: false,
      });

      dmPolygonRef.current = polygon;
      const polyArray = getPolygonPaths(polygon);
      window?.google.maps.event.addListener(polygon, "mouseup", () =>
        handlePolygonEdit(polygon)
      );
      window?.google.maps.event.addListener(polygon, "dragend", () =>
        handlePolygonEdit(polygon)
      );
      setPolygonPath(polyArray);
      // You can add listeners to the polygon as well
      //   window?.google.maps.event.addListener(polygon, "click", function () {
      //     // Handle click event on the polygon
      //   });
    } else if (event.type == window?.google.maps.drawing.OverlayType.CIRCLE) {
      const circle = event.overlay;
      console.log(circle, "fjbhfbvhbhbvhf");
    }
  };

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
    map.setZoom(15);
    // ADD A DRAWING MANAGER TO MAP
    let drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          window.google.maps.drawing.OverlayType.POLYGON,
          window.google.maps.drawing.OverlayType.CIRCLE,
        ],
      },
      polygonOptions: {
        fillColor: "#FF0000",
        fillOpacity: 0.5,
        strokeWeight: 2,
        clickable: true,
        editable: true,
      },
    });
    // CREATE A REF TO DRAWING MANAGER
    drawingManagerRef.current = drawingManager;
    // CONNECT THE DM WITH MAP INSTANCE
    if (createGeoFence) drawingManager.setMap(map);
    // drawingManager.setMap(map);

    // LISTEN FOR EVENT WHEN POLYGON COMPLETE
    window.google.maps.event.addListener(
      drawingManager,
      "overlaycomplete",
      onPolygonComplete
    );
  }, []);

  const onPolygonSave = () => {
    const polygon = new window.google.maps.Polygon({
      paths: polygonPath,
      strokeColor: "#06B95F",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#06B95F",
      fillOpacity: 0.35,
      clickable: false,
    });
    drawingManagerRef.current.setMap(null);
    finalPoly.current = polygon;
    polygon.setMap(mapRef.current);
    dmPolygonRef.current.setMap(null);
  };

  const handleStartOver = () => {
    setPolygonPath([]);
    // Disable drawing mode
    drawingManagerRef.current.setMap(mapRef.current);

    // Allow the user to edit the drawn polygon
    dmPolygonRef.current.setMap(null);

    // Remove drawing control
    drawingManagerRef.current.setOptions({
      drawingControl: true,
    });
  };

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  const getLivestockImg = (status) =>
    status?.toLowerCase() === "safe"
      ? SafeLivestockPointer
      : UnsafeLivestockPointer;

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: mapWidth,
        height: mapHeight,
      }}
      options={{
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
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
        ref={circleRef}
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
      {createGeoFence && (
        <Stack direction={"row"} gap={1} p={1}>
          <Button
            variant="contained"
            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
            onClick={handleStartOver}
          >
            Start Over
          </Button>
          <Button
            variant="contained"
            onClick={onPolygonSave}
            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            Save
          </Button>
        </Stack>
      )}
    </GoogleMap>
  ) : (
    <Skeleton width={mapWidth} height={mapHeight} />
  );
};

export default GetMap;
