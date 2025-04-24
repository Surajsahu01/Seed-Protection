import { io } from "socket.io-client";
import { API_BASE_URL } from "../Utils/util";

const socket = io(API_BASE_URL); // or your server IP if hosted

export default socket;
