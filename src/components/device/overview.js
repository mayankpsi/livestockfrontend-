import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Typography,
  InputBase,
  Divider,
} from '@mui/material';
import DetailForm from '../Common/detailForm';
import DetailMap from '../Common/detailMap';
import UnitTable from '../Common/unitTable';
const Overview = ({ title, data, apiEndpoint }) => {
  const navigate = useNavigate();
  const [updateMap, setUpdateMap] = useState();

  useEffect(() => {
    console.log('DeviceData', data);
  }, [data]);

  return (
    <>
      <Grid
        container
        style={{
          flexDirection: 'row',
          columnGap: '10px',
        }}
        className="flex mb20px"
      >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <DetailForm
            title={title && title}
            data={data && data}
            apiEndpoint={apiEndpoint && apiEndpoint}
            updateMap={updateMap}
          />
        </Grid>

        <Grid
          item
          lg={5.8}
          md={5.8}
          sm={12}
          xs={12}
          // sx={{ height: "500px ", overflow: "hidden" }}
        >
          {data && data.length > 0 && data[0].nodeGeoLatitude && (
            <DetailMap
              data={{
                lat: updateMap
                  ? updateMap.lat
                  : parseFloat(data[0].nodeGeoLatitude),
                lng: updateMap
                  ? updateMap.lng
                  : parseFloat(data[0].nodeGeoLongitude),
              }}
              updateLat={(e) => console.log(e)}
              updateLng={(e) => console.log(e)}
              update={(lat, lng) => setUpdateMap({ lat: lat, lng: lng })}
              height={'470px'}
            />
          )}
        </Grid>
      </Grid>

      <Divider className="Divider" />

      <UnitTable
        data={
          data &&
          data.length > 0 &&
          data[0]?.nDepth1 &&
          data[0]?.nDepth1.length > 0 &&
          data[0]?.nDepth1[0]
        }
        heading={data && data}
      />
    </>
  );
};

export default Overview;
