import React from 'react';
import { Box, Stack, Button } from '@mui/material';
import {AddCircleOutlineIcon} from '../icons';
import { ButtonPrimary,TypographyPrimary } from './themeComponents';


const TabPane = ({text, btnText,btnIcon,onBtnClick, btnBgColor,type, secondaryText, btnColor}) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
      <TypographyPrimary sx={{mb:0.3, fontSize:'2rem', textTransform:'capitalize'}}>{text}</TypographyPrimary>
      {
        secondaryText && (
          <TypographyPrimary sx={{mt:0, textTransform:'capitalize'}}>{secondaryText}</TypographyPrimary>
        )
      }
      </Box>
      <ButtonPrimary 
      sx={{background:btnBgColor?btnBgColor:'#B58B5D',p:'5px 15px', color:`${btnColor?btnColor:'#fff'}`}}
      onClick={onBtnClick}
      type={type}
      startIcon={btnIcon?<AddCircleOutlineIcon fontSize='large'/>:null}>{btnText}</ButtonPrimary>
    </Stack>
  );
}

export default TabPane;
