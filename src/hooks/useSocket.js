import io from "socket.io-client";

const useSocket = () => {
  const socket = io("http://localhost:8085/");
  return socket;
};

export default useSocket;
