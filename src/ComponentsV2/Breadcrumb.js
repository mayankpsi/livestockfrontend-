import React from "react";
import {Grid, Typography, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

const Breadcrumb = ({data}) => {
    return (
        <Grid
          container
          direction="row"
          justifyContent="start"
          sx={{margin:'15px 0',marginTop:6}}
        >
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className="fs16px bold"
           
          >
            <Link
              to="/admin/dashboard"
              className="textDecorNone"
              key="1"
            >
              <Typography className="fs16px bold" sx={{color:'#B58B5D'}}>
                Dashboard
              </Typography>
            </Link>
            {
              data?.map(ele => (
                <Link
                to={`/admin/${ele.link}`}
                className="textDecorNone"
                key="2"
              >
                <Typography className="fs16px bold " sx={{color:'#535353', textTransform:'Capitalize'}}>
                  {ele.label}
                </Typography>
              </Link>
              ))
            }
           
          </Breadcrumbs>
        </Grid>
    )
}

export default Breadcrumb;