var socket = io();

socket.on('connect', () => console.log('connected via socket'));