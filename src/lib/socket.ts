// // import { io, Socket } from "socket.io-client";

// // let socket: Socket;

// // export const getSocket = () => {
// //   if (!socket) {
// //     socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
// //       autoConnect: false,
// //       withCredentials: true
// //     });
// //   }
// //   return socket;
// // };

// import { io, Socket } from "socket.io-client";

// let socket: Socket | null = null;

// export const getSocket = () => {
//   if (!socket) {
//     socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
//       transports: ["websocket", "polling"],
//       autoConnect: false,
//       withCredentials: true
//     });
//   }
//   return socket;
// };



import { io, Socket } from "socket.io-client"; 
// const accessToken = localStorage.getItem(accessToken) 
let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      transports: ["websocket"],
      autoConnect: false,
      auth: {
    token: localStorage.getItem("accessToken") 
  }
    });
  }
  return socket;
};
