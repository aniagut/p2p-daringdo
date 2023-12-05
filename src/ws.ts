import socketIOClient from "socket.io-client";

const WS = "ws.p2p-daringdo.lol";
export const ws = socketIOClient(WS);
