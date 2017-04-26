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
  message: 'message'
};

io.on(dictionary.connection, (socket) => {
  console.log('connected via socket.io');

  socket.on(dictionary.message, (message) => {
    /** This is for sending all users from page without current
     socket.broadcast.emit(dictionary.message, message);
     */

    message.timeStamp = moment.valueOf();
    io.emit(dictionary.message, message);
  });

  socket.emit(dictionary.message, {text: dictionary.greetings, name: dictionary.system});

});

app.use(express.static(`${__dirname}/public`));

http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));