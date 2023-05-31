import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// export const BASE_URL = "http://103.127.30.171:5000/api";
export const BASE_URL = 'http://localhost:8080/api/v1';

// export const BASE_CURL = "https://api.postmyad.live";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('agro_token')}`,
  // },
});

export const adminRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('liveStock_token')}`,
  },
});

const requestInterceptor = adminRequest.interceptors.request.use(
  (request) => {
    // console.log("request from request Interceptor", request);
    const accessToken = localStorage.getItem('liveStock_token');
    // const storeData = JSON.parse(localStorage.getItem('userData'))
    if (accessToken) {
      // console.log("access Token from interceptor ==> ", accessToken)
      request.headers['Authorization'] = 'Bearer ' + accessToken;
      request.headers['Content-Type'] = 'application/json';
    }
    return request;
  },
  (error) => Promise.reject(error)
);
const responseInterceptor = adminRequest.interceptors.response.use(
  (response) => {
    // console.log("Response from Response Interceptor", response);
    return response;
  },

  async (error) => {
    // console.log("error from response Interceptor ==> ", error?.config)
    if (error?.response?.status == 401) {
      // 401 unauthorized // invalid token / expired token
      console.log('Refreshing...');
      // localStorage.removeItem("saps_refreshtoken");
      // localStorage.removeItem("agro_type");
      // localStorage.removeItem("saps_id");
      // localStorage.removeItem("saps_user");
      // localStorage.removeItem("user_role");
      // localStorage.removeItem("role");

      // navigate("/login");
      window.location.href = '/authentication/sign-in';
      // originalRequest.sent = true;
    }
    const originalRequest = error?.config;

    return error;
  }
);
