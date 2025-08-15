const { Socket } = require("socket.io");
const mongoose = require("mongoose");
const User = require("../models/User");
const { updateChat, updateChatDirectly } = require("../controllers/chat");

const handleSocketConnections = (io) => {
  io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    // joining the user to a particular room
    socket.on("join_room", (roomName) => {
      socket.join(roomName);
      const numSocketsInRoom =
        io.sockets.adapter.rooms.get(roomName)?.size || 0;
      // console.log(`Number of sockets in room ${roomName}: ${numSocketsInRoom}`);
    });

    // when a new friend is added
    socket.on("new_friend_added", () => {
      io.emit("add_new_friend");
      console.log("emmitted for adding friend");
    });

    // Private Messsage controller
    socket.on("private_message", ({ roomName, messageObj }) => {
      // writing the logic for personal chat

      // Now send the message to recepient (if online), i.e., the numberOfSocketsInRoom is 2
      console.log(messageObj);
      const numSocketsInRoom =
        io.sockets.adapter.rooms.get(roomName)?.size || 0;
      if (numSocketsInRoom == 1) {
        messageObj.owner = roomName;
        io.in(roomName).emit("user_is_alone", messageObj);
        // console.log("only one user is online ", messageObj);
      } else {
        io.in(roomName).emit("receive_private_message", messageObj);
        // console.log("both users are online and message obj is", messageObj);
      }
    });

    socket.on("group message", (data) => {
      const { sender, groupName, message } = data;
      var roomName = groupName;
      const room = io.sockets.adapter.rooms.get(roomName);

      if (room && room.has(roomName)) {
        io.sockets.in(roomName).emit("private_message", { sender, message });
      } else {
        socket.join(roomName);
        io.sockets.in(roomName).emit("serverMessage", { sender, message });
        console.log("message is ", message);
        console.log("sender is ", sender);
      }
    });

    // logic for handling the case when a user is typing...
    socket.on("user_is_typing", (data) => {
      socket.to(data).emit("user_is_typing", data);
    });

    socket.on("user_is_not_typing", (data) => {
      socket.to(data).emit("user_is_not_typing", data);
    });

    socket.on("handle_disconnect", ({ roomNames }) => {
      for (i in roomNames) {
        socket.leave(i);
      }
    });
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
module.exports = { handleSocketConnections };
