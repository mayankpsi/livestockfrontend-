import React, { Component, useEffect, useState } from "react";
import { Grid, Button, Select, MenuItem } from "@mui/material";
// import "./styles.css";
import Mark from "../../../../../assets/images/cow1.png";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle,
  DrawingManager,
} from "react-google-maps";
import { useSnackbar } from "notistack";

import { useLoaderController, setLoader } from "../../../../../context/common";

import { adminRequest } from "../../../../../requestMethod";
import { useParams } from "react-router-dom";

const data = [
  {
    name: "Karnataka",
    coordinates: { lat: 28.609445466770463, lng: 77.36956282076433 },
    mag: 8.1,
  },
];

const CustomMaker = ({ item }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [mapPointer, setMapPointer] = React.useState({
    lat: 28.609445466770463,
    lng: 77.36956282076433,
  });

  return (
    <Marker
      //                 //  icon={Mark}

      icon={{
        // url: Mark,
        // scaledSize:  new window.google.maps.Size(80,55),
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: "#b58b5d",
        fillOpacity: 0.2,
        scale: Math.pow(2, item.mag) / 2,
        strokeColor: "white",
        strokeWeight: 2,
      }}
      position={item.coordinates}
      onMouseOver={() => setIsOpen(true)}
      onMouseOut={() => setIsOpen(false)}
    >
      {isOpen && (
        <InfoWindow>
          <div style={{ textAlign: "center" }}>
            <div>
              <b>{item.name}</b>
            </div>
            <div>Contacts: {item.mag}</div>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

const GoogleMapExample = withGoogleMap(
  ({ radius, pointChange, mapPointer }) => {
    return (
      <>
        <GoogleMap
          defaultCenter={mapPointer}
          defaultZoom={18}
          onClick={(e) => pointChange(e)}
          // onDrag={(e)=>console.log(e)}
          // onDragEnd={(e)=>console.log(e)}
        >
          {/* {data.map((item, index) => (
        <CustomMaker item={item} key={index} />
      ))} */}
          <Marker
            key={"ghjkjl;"}
            icon={{
              url: Mark,
              scaledSize: new window.google.maps.Size(80, 55),
            }}
            position={mapPointer}
          />
          {/* {radius && ( */}
          <Circle
            // onLoad={onLoad}
            // optional
            // onUnmount={onUnmount}
            // required
            center={mapPointer}
            // required
            options={{
              strokeColor: "white",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#b58b5d",
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              radius: radius,
              //    zIndex: 1000000
            }}
          />
          {/* )} */}
        </GoogleMap>
      </>
    );
  }
);

const Index = ({ details }) => {
  const [controller, dispatch] = useLoaderController();
  const { enqueueSnackbar } = useSnackbar();
  const { livestockID } = useParams();

  const [mapPointer, setMapPointer] = React.useState({
    lat: details ? details.lat : 28.609445466770463,
    lng: details ? details.lng : 77.36956282076433,
  });
  const RadiusOptions = [
    { name: "50 meter", value: 50 },
    { name: "60 meter", value: 60 },
    { name: "70 meter", value: 70 },
    { name: "80 meter", value: 80 },
    { name: "90 meter", value: 90 },
    { name: "100 meter", value: 100 },
    { name: "150 meter", value: 150 },
    { name: "200 meter", value: 200 },
    { name: "300 meter", value: 300 },
  ];
  const [radius, setRadius] = useState(details ? details.radius : 50);
  const [update, setUpdate] = useState(false);
  const changePoint = (e) => {
    setMapPointer(false);
    setTimeout(() => {
      setMapPointer({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }, [0]);
  };

  const updateGeoLoaction = async () => {
    try {
      setLoader(dispatch, true);
      let body = {
        ...mapPointer,
        radius,
      };
      const res = await adminRequest.post(
        `/liveStock/update/geolocation?liveStockID=${livestockID}`,
        body
      );

      console.log("update ", res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        setUpdate(false);

        enqueueSnackbar(res?.data?.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Grid item className="flex spaceBetween mb10px ">
        <Grid item md={5} lg={5} className="flex">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className=" border   Width100  bRadius_8 fontWeight700"
            value={radius}
            onChange={(e) => {
              setRadius(false);
              setTimeout(() => {
                setRadius(e.target.value);
              }, [0]);
            }}
            disabled={!update}
            required
            style={{ minWidth: "200px" }}
          >
            {RadiusOptions.length > 0 &&
              RadiusOptions.map((device, i) => (
                <MenuItem
                  value={device.value}
                  key={i}
                  className="fs14px d_color"
                >
                  {device.name}
                </MenuItem>
              ))}
          </Select>
          {/* <Button className="fs14px  d_bgcolor Greenborder white_color Transform_Capital">
            ok
          </Button> */}
        </Grid>

        <Button
          className="fs14px  bRadius_8 Greenborder d_color Transform_Capital fontWeight700  p_l-r10-30px  mb10px"
          onClick={() => (!update ? setUpdate(true) : updateGeoLoaction())}
        >
          {/* {inputDisabled ? "Edit" : "Save"} */}

          {update ? "Save" : "Change Geo fence"}
        </Button>
      </Grid>

      <div>
        {radius != false && mapPointer != false && (
          <GoogleMapExample
            containerElement={
              <div style={{ height: `500px`, width: "100%" }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
            radius={radius}
            pointChange={(e) => update && changePoint(e)}
            mapPointer={mapPointer}
          />
        )}
      </div>
    </>
  );
};

export default Index;
