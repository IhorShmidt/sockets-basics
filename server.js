const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const dictionary = {
    connection: 'connection',
    message: 'message'
};

io.on(dictionary.connection, (socket) => {
    console.log('connected via socket.io');

    socket.on(dictionary.message, (message) => {
        socket.broadcast.emit(dictionary.message, message);
    });

});

app.use(express.static(`${__dirname}/public`));

http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));