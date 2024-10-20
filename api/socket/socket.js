// import { Server } from 'socket.io';

// export function initSocket(server) {
//   const io = new Server(server, {
//     cors: {
//       origin: 'http://localhost:5173',
//       methods: ['GET', 'POST'],
//     },
//   });

//   io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     // Listen for friend request events
//     socket.on('send-friend-request', (data) => {
//       console.log(`Friend request from ${data.senderId} to ${data.receiverId}`);
//       io.to(data.receiverId).emit('receive-friend-request', data);
//     });

//     // Handle user disconnects
//     socket.on('disconnect', () => {
//       console.log('A user disconnected:', socket.id);
//     });
//   });
// }
