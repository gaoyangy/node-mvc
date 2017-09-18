const http = require('http');
const router = require('./router/router')();
const server = http.createServer(router).listen(8080);
const io = require('socket.io').listen(server);
const fs = require('fs')
const Cmessage = require('./controllers/message');
io.on('connection', function(socket) {
    socket.on('firstLogin', data => {
        if(data.firstLogin){
            Cmessage.updateUserLogin(data, msg => {
                io.emit('historyMsg', msg)
                data.firstTime = false
            })

        }
    })
    socket.on('foo', function(data) {
        if (!data.firstLogin) {
            Cmessage.saveMsg(data, datas => {
                io.emit('msg', { error: 0, userInfo: data });
            })
        }
    });
    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });

});