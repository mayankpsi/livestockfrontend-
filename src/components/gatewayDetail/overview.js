import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Divider } from '@mui/material';
import DetailForm from '../Common/detailForm';
import DetailMap from '../Common/detailMap';
import TableHead from '../User/BranchManagerTable';

const Overview = ({ title, data, apiEndpoint }) => {
  const navigate = useNavigate();
  const [updateMap, setUpdateMap] = useState();

  return (
    <>
      <Grid
        container
        style={{
          flexDirection: 'row',
          columnGap: '10px',
        }}
        className="mb20px flex"
      >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <DetailForm
            title={title && title}
            data={data && data}
            apiEndpoint={apiEndpoint || ''}
            updateMap={updateMap}
          />
        </Grid>

        <Grid
          item
          lg={5.8}
          md={5.8}
          sm={12}
          xs={12}
          // sx={{ height: '510px ', overflow: 'hidden' }}
        >
          {data && data.length > 0 && data[0].gatewayGeoLatitude && (
            <DetailMap
              data={{
                lat: updateMap
                  ? updateMap.lat
                  : parseFloat(data[0].gatewayGeoLatitude),
                lng: updateMap
                  ? updateMap.lng
                  : parseFloat(data[0].gatewayGeoLongitude),
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

      <TableHead data={data && data.length > 0 && data[0]?.branchManager} />
    </>
  );
};

export default Overview;
