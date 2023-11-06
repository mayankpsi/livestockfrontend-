// import axios from "axios";

// export const fetchGeofenceAddress = async (lat,lng) => {
//    try{
//      const URL = `http://localhost:8085/api/v1/user/getAaddress?lat=${lat}&lng=${lng}`
//      const res = await axios.get(URL);
//      if(res?.data){
//         return res.data;
//      }
//   }catch(error){
//       return error;
//   }
//  }

//  export const createGeofence = async (userId, body) => {
//    try{
//      const URL = `http://localhost:8085/api/v1/user/addGeofence/?userId=${userId}`;
//      const res = await axios.post(URL,body);
//      if(res?.data){
//         return res.data;
//      }
//   }catch(error){
//       return error;
//   }
//  }
