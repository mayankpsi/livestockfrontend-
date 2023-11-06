import { Pagination,Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getAllUnassignLivestock } from "../apis/livestockServices";


export default function CustomPagination({
  showFirstButton,
  showLastButton,
  size,
  pageLimit,
  count,
  onPageChange,
  setShowLivestocks,
  paginationData,
  setPaginatedData
}) {
  const pageSize = pageLimit;
  const [pagination, setPagination] = useState({count:0,from:0,to:pageSize});

  // useEffect(()=> {
  //   const data = paginationData?.slice(pagination.from, pagination.to);
  //   setPaginatedData(data)
  // },[pagination])
   

  const handlePageChange = (event, page) => {
    const from = (page-1)*pageSize;
    const to = (page-1)*pageSize + pageSize;
    // setPagination({...pagination, from:from,to:to})
    onPageChange(page)
    console.log(page,"jsbhbxhxsbvytvstyvtyvytvyvu")
  }


//have to run useEffect evertime from or to chnages
  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(count)} //
        color="primary"
        onChange={handlePageChange}
        showFirstButton={showFirstButton?showFirstButton:true}
        showLastButton={showLastButton?showLastButton:true}
        size={size}
      />
    </Stack>
  );
}

 