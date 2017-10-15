const http = require('http');
const router = require('./router/router')();
const server = http.createServer(router).listen(8001);
const io = require('socket.io').listen(server);
const fs = require('fs')
const Cmessage = require('./controllers/message');
io.on('connection', function(socket) {
    let userInfo = ''
    socket.on('message', data => {
        userInfo = data
        userInfo.online = true
        Cmessage.updateUserInfo(userInfo.uuid,{online:1})
        if (data.firstLogin) {
            Cmessage.updateUserLogin(userInfo, msg => {
                //io.close('historyMsg')
                io.emit('historyMsg', msg)
            })
        }
    })
    socket.on('foo', function(data) {
        Cmessage.saveMsg(data, datas => {
            io.emit('msg', { error: 0, userInfo: data });
        })
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
