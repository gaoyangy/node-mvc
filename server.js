const http = require('http');
const router = require('./router/router')();
const server = http.createServer(router).listen(8080);
const io = require('socket.io').listen(server);
const fs = require('fs')
const Cmessage = require('./controllers/message');
io.on('connection', function(socket) {
    let userInfo = ''
    socket.on('message', data => {
        if (data.firstLogin) {
            userInfo = data
            Cmessage.updateUserLogin(userInfo, msg => {
                io.emit('historyMsg', msg)
                    //io.close('historyMsg')
                    //socket.close()
            })
        }
    })
    socket.on('foo', function(data) {
        Cmessage.saveMsg(data, datas => {
            io.emit('msg', { error: 0, userInfo: data });
        })
    });
    socket.on('reconnect', function() {
        console.log("sadasdfas");

    });
    socket.on('error', (error) => {
        // ...
        console.log(error)
    });
    socket.on('disconnect', function(data) {
        Cmessage.updateUserLogout(userInfo, 0, data => {
                console.log(data)
            })
            // socket.on('logout_time', function(data) {
            //     console.log(data)
            // })
    });
});