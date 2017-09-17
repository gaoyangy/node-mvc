const http = require('http');
const router = require('./router/router')();
const server = http.createServer(router).listen(3000, "127.0.0.1");
const io = require('socket.io').listen(server);
const fs = require('fs')
const db = require('./config/database')
const Redis = require('ioredis')
const redis = new Redis({
    port: 6379, // Redis port
    host: '127.0.0.1', // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: '',
    db: 0
})

io.on('connection', function(socket) {
    redis.set('foo', 'bar');
    redis.get('foo', function(err, result) {
        console.log(result);
    });
    socket.on('foo', function(data) {
        console.log(data);
        socket.send(data);
        io.emit('msg', { error: 0, userInfo: data });
    });
    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });
});