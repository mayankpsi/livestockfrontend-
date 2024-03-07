import React, { useRef, useCallback, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Circle,
  Polygon,
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
  const {
    getGeolocationAddress,
    polygonPath,
    setPolygonPath,
    circleGeoFence,
    setCircleGeoFence,
    geoFenceType,
    setGeoFenceType,
    setIsGeoFenceSaved,
    mapRef,
    drawingManagerRef,
    dmPolygonRef,
    finalPoly,
    dmCircleRef,
    finalCircle,
    handleStartOver,
    openSnackbarAlert,
  } = useMapContext();
  const circleRef = useRef();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_KEY,
    libraries: ["drawing"],
  });

  const handlePolygonEdit = (polygon) => {
    const paths = getPolygonPaths(polygon);
    setPolygonPath(paths);
  };

  const handleCircleEdit = (circle) => {
    const circleFence = {
      radius: circle?.radius || 0,
      position: {
        lat: circle?.center?.lat() || 0,
        lng: circle?.center?.lng() || 0,
      },
    };
    setCircleGeoFence(circleFence);
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
      setGeoFenceType("polygon");
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
      setGeoFenceType("circle");
      const circle = event.overlay;
      dmCircleRef.current = circle;

      // Disable drawing mode
      drawingManagerRef.current.setDrawingMode(null);

      // Allow the user to edit the drawn polygon
      circle.setEditable(true);

      // Remove drawing control
      drawingManagerRef.current.setOptions({
        drawingControl: false,
      });

      const circleFence = {
        radius: circle?.radius || 0,
        position: {
          lat: circle?.center?.lat() || 0,
          lng: circle?.center?.lng() || 0,
        },
      };
      setCircleGeoFence(circleFence);

      window?.google.maps.event.addListener(circle, "center_changed", () =>
        handleCircleEdit(circle)
      );
      window?.google.maps.event.addListener(circle, "radius_changed", () =>
        handleCircleEdit(circle)
      );
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

    // LISTEN FOR EVENT WHEN POLYGON COMPLETE
    window.google.maps.event.addListener(
      drawingManager,
      "overlaycomplete",
      onPolygonComplete
    );
  }, []);

  useEffect(() => {
    if (createGeoFence) {
      drawingManagerRef.current?.setMap(mapRef.current);
    } else {
      drawingManagerRef.current?.setMap(null);
    }
  }, [createGeoFence, drawingManagerRef.current, mapRef.current]);

  const onPolygonSave = () => {
    if (geoFenceType && (circleGeoFence?.radius || polygonPath?.length > 2)) {
      localStorage.setItem("hideCancel", "true");
      const polygon = new window.google.maps.Polygon({
        paths: polygonPath,
        strokeColor: "#06B95F",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#06B95F",
        fillOpacity: 0.35,
        clickable: false,
      });
      const circle = new window.google.maps.Circle({
        center: circleGeoFence?.position,
        radius: circleGeoFence?.radius,
        strokeColor: "#06B95F",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#06B95F",
        fillOpacity: 0.35,
        clickable: false,
      });

      const farmLocation = {
        lat: Number(geofenceCoordinates.farmLat),
        lng: Number(geofenceCoordinates.farmLng),
      };

      if (geoFenceType === "polygon") {
        const isInside = window?.google?.maps?.geometry?.poly?.containsLocation(
          farmLocation,
          polygon
        );
        if (isInside) {
          finalPoly.current = polygon;
          polygon.setMap(mapRef.current);
          dmPolygonRef.current.setMap(null);
          drawingManagerRef.current.setMap(null);
          setIsGeoFenceSaved(true);
        } else {
          openSnackbarAlert(
            "error",
            "the farm location must be inside geofence"
          );
        }
      } else {
        const distance =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            farmLocation,
            circleGeoFence?.position
          );

        if (distance <= circleGeoFence?.radius) {
          finalCircle.current = circle;
          circle.setMap(mapRef.current);
          dmCircleRef.current.setMap(null);
          drawingManagerRef.current.setMap(null);
          setIsGeoFenceSaved(true);
        } else {
          openSnackbarAlert(
            "error",
            "the farm location must be inside geofence"
          );
        }
      }
    } else {
      openSnackbarAlert("error", "please create a geofence first");
    }
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
        // streetViewControl: false,
        // zoomControl: false,
        mapTypeControl: !createGeoFence,
        // fullscreenControl: false,
      }}
      onClick={(e) =>
        !geofenceCoordinates?.address
          ? getGeolocationAddress(false, e.latLng.lat(), e.latLng.lng())
          : null
      }
      center={{
        lat: Number(geofenceCoordinates?.farmLat) || 0,
        lng: Number(geofenceCoordinates?.farmLng) || 0,
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
          lat: Number(geofenceCoordinates?.farmLat)|| 0,
          lng: Number(geofenceCoordinates?.farmLng) || 0,
        }}
      />
      {geofenceCoordinates?.geoFenceType?.toLowerCase() === "polygon" ? (
        <Polygon
          paths={
            localStorage.getItem("geofence") === "edit"
              ? []
              : geofenceCoordinates?.polygon
          }
          options={{
            strokeColor: "#06B95F",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#06B95F",
            fillOpacity: 0.35,
            clickable: false,
          }}
        />
      ) : (
        <Circle
          ref={circleRef}
          center={{
            lat: Number(geofenceCoordinates?.circleLat),
            lng: Number(geofenceCoordinates?.circleLng),
          }}
          radius={
            localStorage.getItem("geofence") === "edit"
              ? 0
              : geofenceCoordinates?.radius
          }
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
          }}
        />
      )}
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
