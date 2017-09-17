const http = require('http');
const router = require('./router/router')();
const server = http.createServer(router).listen(3000, "127.0.0.1");
const io = require('socket.io').listen(server);
const fs = require('fs')
const db = require('./config/database')


io.on('connection', function (socket) {
    io.emit('this', { will: 'be received by everyone'});
  
    socket.on('private message', function (from, msg) {
      console.log('I received a private message by ', from, ' saying ', msg);
    });
  
    socket.on('disconnect', function () {
      io.emit('user disconnected');
    });
  });