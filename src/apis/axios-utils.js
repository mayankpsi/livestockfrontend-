import axios from "axios";

const BASE_URL_LOCAL = "http://localhost:8085/api/v1";
const BASE_URL_DEV = "http://shipment.psiborg.io:8085/api/v1";

const client = axios.create({ baseURL: BASE_URL_LOCAL });
const BEARER_TOKEN =
  `Bearer ${JSON.parse(localStorage.getItem("userData"))?.accessToken}` || "";

export const request = async ({ ...options }) => {
  client.defaults.headers.Authorization = BEARER_TOKEN;

  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("userData");
      localStorage.removeItem("geofenceCreation");
      localStorage.removeItem("currentTab");
      window.location.reload();
    } else {
      return error;
    }
  };
  const allowedUrl = ["/auth/sign-in", "/auth/sign-up"];
  if (
    JSON.parse(localStorage.getItem("userData")) ||
    allowedUrl?.includes(options?.url)
  ) {
    try {
      const response = await client(options);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  }
};
