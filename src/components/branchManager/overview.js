import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Typography,
  InputBase,
  Divider,
} from '@mui/material';

import CustomizedTables from '../Admin/CustomizedTables';
import DetailForm from '../Common/detailForm';
import DetailMap from '../Common/detailMap';
import UnitTable from '../Common/unitTable';

const Overview = ({ title, data, apiEndpoint }) => {
  const navigate = useNavigate();
  const [updateMap, setUpdateMap] = useState();

  console.log('Overview', data);
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
          // sx={{ marginTop: "-10vh" }}
          // sx={{ height: '510px ', overflow: 'hidden' }}
        >
          {data && data.length > 0 && data[0].branchGeoLatitude && (
            <DetailMap
              data={{
                lat: updateMap
                  ? updateMap.lat
                  : parseFloat(data[0].branchGeoLatitude),
                lng: updateMap
                  ? updateMap.lng
                  : parseFloat(data[0].branchGeoLongitude),
              }}
              updateLat={(e) => console.log(e)}
              updateLng={(e) => console.log(e)}
              changeable={true}
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
          data[0]?.bmDepth1 &&
          data[0]?.bmDepth1.length > 0 &&
          data[0]?.bmDepth1[0]
        }
        heading={data && data}
      />
    </>
  );
};

export default Overview;
