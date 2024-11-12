import io from "socket.io-client";
import { ApiUrl } from "../Network/Urls";

export const socket = io.connect(ApiUrl);

export const SocketJoinRoom = (data) => {
  socket.emit("joinRoom", data);
};
