import { request } from "../../apis/axios-utils";
import { useQuery } from "react-query";

const unassignLivestockApi = (searchTerm = "", page = 1) =>
  request({
    url: `/liveStock/getAll?status=false&deviceType=collar&searchTerm=${searchTerm}&page=${page}&limit=${10}`,
  });

const useGetUnassignLivestock = (query, page) => {
  const {
    isLoading,
    error,
    data,
    refetch,
    isSuccess
  } = useQuery(
    ["getAllUnassignLivestock", query, page],
    () => unassignLivestockApi(query, page),
    {
      enabled: true,
    }
  );

  return {
    isLoading,
    error,
    allUnassignLivestock:data?.data?.data,
    refetch,
    isSuccess
  };
};

export default useGetUnassignLivestock;
