const http = require('http');
const router = require('./router/router')();
const server = http.createServer(router).listen(3000, "127.0.0.1");
const io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    console.log('User connected');
    socket.on('message', function() {
        socket.send('hi');
        setInterval(() => {
            socket.send(1111)
        }, 300)
    });
});