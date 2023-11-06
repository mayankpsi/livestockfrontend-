import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxzdXNlckBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NTI4YzkwZjAwYjM2MmM4NzRkNTZiMmYiLCJyb2xlIjoyLCJpYXQiOjE2OTc1NDI1OTF9.bcIfe2FJVHPBvX5bBXlstpw5DBQYV15sFnBQzPgtPi0"
}

const userID = "6528c90f00b362c874d56b2f";

export const getAllLiveStocksByUser = async () => {
    try{
      const URL = `http://localhost:8085/api/v1/liveStock/getAll`;
      const res = await axios.get(URL,{
        headers:headers
      })
      if(res?.data){
         return res.data;
      }
   }catch(error){
       return error;
   }
  }


  export const removeLivestockFromCollar = async (collarId,livestockId) => {
    try{
      const URL = `http://localhost:8085/api/v1/devices/removeDevice?deviceID=${collarId}&LiveStockID=${livestockId}`;
      const res = await axios.post(URL,{
        headers:headers
      })
      if(res?.data){
         return res.data;
      }
   }catch(error){
       return error;
   }
  }
  export const getAllUnassignLivestock = async () => {
    try{
      const URL = `http://localhost:8085/api/v1/liveStock/getAll?status=false`;
      const res = await axios.get(URL,{
        headers:headers
      })
      if(res?.data){
         return res.data;
      }
   }catch(error){
       return error;
   }
  }

  export const assignDeviceToLivestock = async (collarId,livestockId) => {
    try{
      const URL = `http://localhost:8085/api/v1/devices/assignDeviceToLivestock?deviceId=${collarId}&liveStockId=${livestockId}`;
      const res = await axios.post(URL,{
        headers:headers
      })
      if(res?.data){
         return res.data;
      }
   }catch(error){
       return error;
   }
  }