import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography, Container } from '@mui/material';
import Table from './components/bmDetailTable';

const BranchManager = ({ data, address }) => {
  const { gatewayName } = useParams();
  const navigate = useNavigate();
  const [author] = useState(localStorage.getItem('agro_type'));

  useEffect(() => {
    console.log('data>Branch Manager>', data);
  });
  return (
    <>
      {/* <Container maxWidth="lg" className=" mb30px mt20px "> */}
      <Grid container>
        <Grid container className=" mb20px flex spaceBetween ">
          <Typography className="fs20px fontWeight700 d_color">
            {' '}
            Branch Manager ({data && data?.length})
          </Typography>

          {author == 'admin' && (
            <Button
              onClick={() => {
                navigate(
                  `/admin/site-management/${gatewayName}/add-branch-manager `,
                  {
                    state: {
                      address,
                    },
                  }
                );
              }}
              className="fs14px Greenborder d_color Transform_Capital   p_l-r10-30px"
            >
              Add
            </Button>
          )}
        </Grid>
        <Table data={data && data} />
      </Grid>
      {/* </Container> */}
    </>
  );
};

export default BranchManager;
