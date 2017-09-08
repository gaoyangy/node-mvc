window.message = (userInfo) => {
    if (userInfo.constructor !== Object ) {
      console.error('Websocket库的message的参数必须为Object')
    }
    const socket = io('http://192.168.100.41:8888',userInfo);
    socket.on('connect', function () {
    console.log('已连接')
    socket.send('hi');
    socket.on('channel-message', function (msg) {
      // my msg
      console.log(msg,'msg')
    });
    socket.on('message-error', function (msg) {
      // my msg
      console.log(msg,'msg')
    });
    socket.on('disconnect', function () {
    console.log('连接终断')
    // socket.emit('user disconnected');
    });
    });
  }
