import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import AdminUIContainer from '../../../layout/AdminUIContainer';
import SiteManageTable from '../../../components/Admin/siteManageTable';
import { adminRequest } from '../../../requestMethod';
import { useLoaderController, setLoader } from '../../../context/common';

// siteManagement first page
const Index = () => {
  const navigate = useNavigate();
  const [siteDetails, setSiteDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();

  const getSite = async () => {
    let ID = localStorage.getItem('agro_id');
    setLoader(dispatch, true);
    try {
      const res = await adminRequest.get(`/site/getsite/${ID}`);
      setLoader(dispatch, false);
      if (res.status == 200) {
        setSiteDetails(res?.data);
      }
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err?.response?.data?.msg, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    getSite();
  }, []);
  return (
    <>
      <AdminUIContainer>
        {/* {!siteDetails ? (
          <>
            <Container maxWidth="lg" className=" mb30px mt20px "></Container>
          </>
        ) : ( */}
        <>
          <Grid
            container
            alignItems="center"
            style={{ height: '80px', width: '100%' }}
            className="d_bgcolor "
          >
            <Container maxWidth="lg">
              <Grid
                container
                direction="row"
                justifyContent="start"
                //   alignItems="center"
              >
                <Breadcrumbs
                  separator="›"
                  aria-label="breadcrumb"
                  className=" white_color fs16px bold "
                >
                  <Link
                    to="/admin/dashboard"
                    className="white_color textDecorNone "
                    key="1"
                  >
                    <Typography className="white_color fs16px bold Transform_Capital ">
                      Dashboard
                    </Typography>
                  </Link>
                  ,
                  <Link
                    to="/admin/site-management"
                    className="white_color textDecorNone"
                    key="2"
                  >
                    <Typography className="white_color fs16px bold Transform_Capital ">
                      Site management
                    </Typography>
                  </Link>
                  ,
                </Breadcrumbs>
              </Grid>
            </Container>
          </Grid>
          <Container maxWidth="lg" className=" mb30px mt20px ">
            <Grid
              container
              className="fs20px spaceBetween  mb30px fontWeight700 d_color  "
              // style={{ border: "1px solid blue" }}
            >
              <Typography className="fs20px  fontWeight700 d_color  ">
                All Sites({siteDetails && siteDetails?.length})
              </Typography>
              <Button
                className="fs16px  fontWeight600 d_color Greenborder p_l-r30px"
                onClick={() => {
                  navigate('/admin/site-management/add-site-management');
                }}
              >
                Add
              </Button>
            </Grid>
            <SiteManageTable
              className=" mt30px "
              data={siteDetails}
              reRander={getSite}
            />
          </Container>
        </>
        {/* )} */}
      </AdminUIContainer>
    </>
  );
};

export default Index;
