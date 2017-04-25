const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', () => console.log('connected via socket.io'));

app.use(express.static(`${__dirname}/public`));

http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));