export const getTabText = (title, dataLength) => {
  return `Showing ${(dataLength > 10 ? 10 : dataLength) || 0} out of ${
    dataLength || 0
  } ${title}`;
};


let timeout;
export const handleSearchQuery = (query, setter) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => setter(query), 1000);
};

