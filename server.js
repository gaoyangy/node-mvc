const http = require('http');
const router = require('./router')();
const server = http.createServer(router)
const io = require('socket.io');
const socketIo = io();
//room list
let roomlist = {}
socketIo.on('getConnections', socket => {
    //获取roomid
    let url = socket.request.headers.referer
    let splited = url.split('/')
    let roomId = splited(splited.length - 1)
    let user = ''
    socket.on('join', userName => {
        if (!roomlist[roomId]) {
            roomlist[roomId] = []
        }
        user = userName
        roomlist[roomId].push(userName)
        socket.join(roomId)
        socketIo.to(roomId).emit('sys', userName + '加入了房间', roomlist[roomId])
        console.log(userName, roomId)
    })

    socket.on('leave', () => {
        socket.emit('disconnect')
    })

    socket.on('disconnect', () => {
        let $index = roomlist[roomId].indexOf(user)
        if ($index !== -1) {
            roomlist[roomId].splice(index, 1)
        }

        socket.leave(roomId)
        socketIo.to(roomId).emit(sys, user + '退出了', roomlist[roomId])
        console.log(user + '退出了' + roomId);
    })

    socket.on('message', msg => {
        if (roomlist[roomId].indexOf(user) === -1) {
            return false;
        }
        socketIo.to(roomId).emit('msg', user, msg)
    })
})
server.listen(3000, err => {
    if (err) {
        console.error(err);
        console.info('Failed to start server');
    } else {
        console.info(`Server started`);
    }
});