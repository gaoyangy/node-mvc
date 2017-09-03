const http = require('http');
const router = require('./router')()

http.createServer(router).listen(3000, err => {
    if (err) {
        console.error(err);
        console.info('Failed to start server');
    } else {
        console.info(`Server started`);
    }
});