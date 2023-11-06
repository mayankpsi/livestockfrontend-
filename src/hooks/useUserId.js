const useUserId = () => {
  return  JSON.parse(window?.localStorage?.getItem("userData"))?.userId || '';
};

export default useUserId;
