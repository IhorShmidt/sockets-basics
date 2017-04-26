'use strict';

const PORT = process.env.PORT || 3000,
  express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  moment = require('moment');

const dictionary = {
  greetings: 'Welcome to chat Application',
  system: 'System',
  connection: 'connection',
  joinRoom: 'joinRoom',
  message: 'message'
};

let clientInfo = {};

io.on(dictionary.connection, (socket) => {
  console.log('connected via socket.io');

  socket.on(dictionary.joinRoom, (req) => {
    clientInfo[socket.id] = req.room;
    socket.join(req.room);
    socket.broadcast.to(req.room).emit(dictionary.message, {
      name: dictionary.system, text: `${req.name} has joined!`, timeStamp: moment.valueOf()
    });
  });

  socket.on(dictionary.message, (message) => {
    /** This is for sending all users from page without current
     socket.broadcast.emit(dictionary.message, message);
     */

    message.timeStamp = moment.valueOf();
    io.to(clientInfo[socket.id].room).emit(dictionary.message, message);
  });

  socket.emit(dictionary.message, {text: dictionary.greetings, name: dictionary.system});

});

app.use(express.static(`${__dirname}/public`));

http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));