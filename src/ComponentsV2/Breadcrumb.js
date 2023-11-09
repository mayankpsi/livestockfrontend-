import React from "react";
import {Grid, Typography, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

const Breadcrumb = ({data}) => {
    return (
        <Grid
          container
          direction="row"
          justifyContent="start"
        >
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className="fs16px bold"
          >
            <Link
              to="/"
              className="textDecorNone"
              key="1"
            >
              <Typography className="bold" sx={{color:'#B58B5D', fontSize:"20px"}}>
                Dashboard
              </Typography>
            </Link>
            {
              data?.map(ele => (
                <Link
                to={`/${ele.link}`}
                className="textDecorNone"
                key="2"
              >
                <Typography className="bold " sx={{color:'#535353', fontSize:"20px",textTransform:'Capitalize'}}>
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