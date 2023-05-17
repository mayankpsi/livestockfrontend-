import React, { useState, useEffect } from 'react';
// import {  } from 'react-google-maps';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

import pin from '../../assets/images/pin.png';

const center = {
  lat: 28.7041,
  lng: 77.1025,
};
const Index = ({ data, updateLat, updateLng, update, height, changeable }) => {
  const containerStyle = {
    width: '100%',
    height: height ? height : '665px',
  };
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCchikomkJ-Rjx7UMibYM00rjEcufRPSzU',
  });
  const [map, setMap] = useState(null);

  const [mapPointer, setMapPointer] = useState({
    lat: 28.609445466770463,
    lng: 77.36956282076433,
  });

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(mapPointer);
    // map.fitBounds(bounds);
    map.setZoom(12);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const changeDat = (e) => {
    console.log('eee', e.latLng.lat(), e.latLng.lng());
    console.log(changeable, !changeable);
    if (!changeable) return;
    let type = localStorage.getItem('agro_type');
    if (type == 'user') {
      return;
    } else if (type == 'admin' && updateLat) {
      setMapPointer({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      updateLat(e.latLng.lat());
      updateLng(e.latLng.lng());
      update(e.latLng.lat(), e.latLng.lng());
    }
  };
  useEffect(() => {
    if (data) {
      setMapPointer({ lat: parseFloat(data.lat), lng: parseFloat(data.lng) });
    }
  }, [data]);

  useEffect(() => {
    console.log('>>>>>>>>>>>mapPointer', mapPointer);
  }, [mapPointer]);

  return (
    <>
      {isLoaded && mapPointer ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapPointer}
          // zoom={19}
          onUnmount={onUnmount}
          onLoad={onLoad}
          onClick={(e) => changeDat(e)}
        >
          <MarkerF
            key={'lol'}
            position={mapPointer}
            // icon={
            //   {
            //     // url: pin,
            //     // scale: 5,
            //   }
            // }
          />
        </GoogleMap>
      ) : (
        <div> </div>
      )}
    </>
  );
};

export default Index;
