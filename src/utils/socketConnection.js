import io from "socket.io-client";

const socket = io("https://appetite-socket.herokuapp.com");

export default socket;