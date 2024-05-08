const _ = require("lodash");
const express = require('express');
const app = express();
const port = 56000; // define your port
const server = app.listen(port, () => {
  console.log(`We are Listening on port ${port}...`);
});

const io = require('socket.io')(server, {
    path: "/pathToConnection"
});
let users = {};
io.on('connection', (socket) => {

  let userId = socket.handshake.query.userId;
  
  if (!users[userId]) users[userId] = [];
  users[userId].push(socket.id);
  io.sockets.emit("online", userId);
  updateUserState(userId, 1);
  console.log(userId, "Is Online!", socket.id);
  
  
  socket.on('disconnect', (reason) => {
    _.remove(users[userId], (u) => u === socket.id);
    if (users[userId].length === 0) {
      updateUserState(userId, 0);
      io.sockets.emit("offline", userId);
      delete users[userId];
    }
   
    socket.disconnect();
    console.log(userId, "Is Offline!", socket.id);
  });

  // 更新用戶狀態的函式
  function updateUserState(userId, state) {
    const axios = require('axios');
    axios.post('http://111.184.127.25:8000/api/users/updateUserState', {
      id: userId,
      state: state
    })
    .then(response => {
      console.log('User state updated:', response.data);
    })
    .catch(error => {
      console.error('Error updating user state:', error);
    });
  }
});

