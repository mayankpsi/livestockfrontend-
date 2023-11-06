import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxzdXNlckBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NTI4YzkwZjAwYjM2MmM4NzRkNTZiMmYiLCJyb2xlIjoyLCJpYXQiOjE2OTcxOTI5NDN9.MfkeRmMtyvnL32BY16TD9KS0I1qoBb5eOjNO6Q2MpNE'
}

const userID = "6528c90f00b362c874d56b2f";

export const userLogin = async (body) => {
    try{
      const URL = `http://localhost:8085/api/v1/auth/sign-in`;
      const res = await axios.post(URL,body,{
        headers:headers
      });
      if(res?.data){
         return res.data;
      }
   }catch(error){
       return error;
   }
  }