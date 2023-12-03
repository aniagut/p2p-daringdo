import socketIOClient from "socket.io-client";

const WS = "http://16.171.239.168";
export const ws = socketIOClient(WS);
