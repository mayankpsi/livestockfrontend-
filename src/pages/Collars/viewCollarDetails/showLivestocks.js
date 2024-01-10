import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  TypographyWithBg,
  ButtonPrimary,
} from "../../../ComponentsV2/themeComponents";
import LivestockCard from "./livestockCard";
import { CustomPagination, SearchInput, NoData } from "../../../ComponentsV2";

const ShowLivestocks = ({
  data,
  isLivestock,
  onSubmit,
  setOpenAddLivestockModal,
  openSnackbarAlert
}) => {
  const [showLivestocks, setShowLivestocks] = useState(data);
  const [selectedValue, setSelectedValue] = useState();
  const [query, setQuery] = useState("");

  useEffect(() => {
    setShowLivestocks(data);
  }, [data]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleLivestockSearch = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleLivestockAssignSave = () => {
    
    if(selectedValue){
      const type = data?.find(ele => ele?._id === selectedValue)?.deviceType;
      onSubmit(selectedValue,type)
    }else{
      openSnackbarAlert()
    }
  }

  return (
    <Box>
      <TypographyWithBg>Assign Livestock</TypographyWithBg>
      {data?.length ? (
        <Stack direction="row" p={4}>
          <SearchInput
            placeholder="Search Livestock Id or Name"
            name="search"
            onChange={handleLivestockSearch}
          />
        </Stack>
      ) : null}

      {data?.length ? (
        <Stack direction="row" flexWrap="wrap" justifyContent="space-evenly">
          {showLivestocks
            ?.filter((ele) =>
              query
                ? ele?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
                  ele?.uID?.toLowerCase()?.includes(query?.toLowerCase())
                : true
            )
            ?.map((el) => (
              <LivestockCard
                key={el._id}
                name={isLivestock ? el?.name : el?.deviceName} //fd - deviceName
                id={el.uID}
                value={el._id}
                handleChange={handleChange}
                selectedValue={selectedValue === el._id}
              />
            ))}
        </Stack>
      ) : (
        <NoData />
      )}

      {data?.length ? (
        <Stack direction="row" justifyContent="center" py={7}>
          {/* <CustomPagination
            showFirstButton={true}
            showLastButton={true}
            size="large"
            paginationData={[]}
            setPaginatedData={(data) => {}}
          /> */}
          <ButtonPrimary
            onClick={handleLivestockAssignSave}
            sx={{
              position: "absolute",
              right: "35px",
              background: "#05254C",
              padding: "5px 30px",
            }}
          >
            Save
          </ButtonPrimary>
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" py={5}>
          <ButtonPrimary
            onClick={() => setOpenAddLivestockModal(false)}
            sx={{
              position: "absolute",
              right: "35px",
              background: "#05254C",
              padding: "5px 30px",
            }}
          >
            Cancel
          </ButtonPrimary>
        </Stack>
      )}
    </Box>
  );
};

export default ShowLivestocks;
