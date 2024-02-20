import { request } from "./axios-utils";

export const getProfileDetails = (id) => {
  return request({ url: `/auth/getUpdatedUserData?userId=${id}` });
};
