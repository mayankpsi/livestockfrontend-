import React from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  Circle,
} from "@react-google-maps/api";
import {Mark} from "../assets";

const center = {
  lat: 28.515733361162216,
  lng: 77.37178971104055,
};

const livestocks = [
  {
    id: 1,
    position: { lat: 28.507555017373573, lng: 77.40205505767113 },
  },
  {
    id: 2,
    position: { lat: 28.50710247195052, lng: 77.40224817671145 },
  },
  {
    id: 3,
    position: { lat: 28.50672534928168, lng: 77.4019477693154 },
  },
  {
    id: 4,
    position: { lat: 28.506942194980983, lng: 77.40160444657704 },
  },
];

const MAP_KEY = "AIzaSyBoq0tt73i_mEUB4gsGN8_ClQpD9d9RqFE";
const GetMap = ({ mapWidth, mapHeight, isLivestocks,livestockData,geofenceCoordinates }) => {
  return (
    <LoadScript googleMapsApiKey={MAP_KEY}>
      <GoogleMap
        mapContainerStyle={{
          width: mapWidth,
          height: mapHeight,
        }}

        onClick={ele => console.log(ele,"AIzaSyBoq0tt73i_mEUB4gsGN8_ClQpD9d9RqFE")}
        defaultCenter={center}
        center={center}
        zoom={18}
      >
        {isLivestocks &&
          livestockData &&
          livestockData?.map(({ id, position }) => (
            <Marker
              key={id}
              position={position}
              icon={{
                url: Mark,
                scaledSize: window && window.google && new window.google.maps.Size(100, 100),
              }}
              //   onClick={() => handleActiveMarker(id)}
            />
          ))}
        <Marker
          key="helloworlds"
          title="marker"
          position={center}
          //   onClick={() => handleActiveMarker(id)}
        />
         <Circle
            center={center}
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

// const API_KEY = "aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ=="

// const mapEnvironment = compose(
//   withProps({
//     googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`,
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
// );

// const MapLayout = props => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//     {props.isMarkerShown && (
//       <Marker position={{ lat: -34.397, lng: 150.644 }} />
//     )}
//   </GoogleMap>
// );

// const GetMap = mapEnvironment(MapLayout);

// export default GetMap;
