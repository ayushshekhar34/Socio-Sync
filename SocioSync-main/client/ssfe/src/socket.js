import io from "socket.io-client";

const socket = io("https://sociosync-backend.onrender.com");
// const socket = io("http://localhost:4000");

export default socket;