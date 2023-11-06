import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
    name:"livestockCache"
})

const BASE_URL_LOCAL = "http://localhost:8085/api/v1";
const BASE_URL_DEV = "http://shipment.psiborg.io:8085/api/v1";

const client = axios.create({ baseURL: BASE_URL_LOCAL });
const BEARER_TOKEN =
  `Bearer ${JSON.parse(localStorage.getItem("userData"))?.accessToken}` || "";

export const request = async ({ ...options }) => {
  client.defaults.headers.Authorization = BEARER_TOKEN;

  const onSuccess = (response) => response;
  const onError = (error) => error;

//  Check if we have the data in the cache
//  const cacheResult = await fileCache.getItem(options?.url);
//  console.log(cacheResult,"sjxbhxbvsxgvxsgv")
//  if(cacheResult){
//     return cacheResult;
//   }else{
    try {
        const response = await client(options);
        // await fileCache.setItem(options.url,response);
        return onSuccess(response);
      } catch (error) {
        return onError(error);
      }
    // const response = await client(options);
    // await fileCache.setItem(options.url,response);
    // return response
//   }
};
