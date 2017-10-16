const router = require('../lib/router')((err, req, res) => {
    console.error(err);
    res.statusCode = 500;
    res.end(err);
});
const fs = require('fs')
const readFile = require('../readfile')
//const session = require('../session')
    //
const path = require('path');
var Redis = require('ioredis');
//var redis = new Redis();

const MIME_TYPE = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};
//
const actorsController = require('../controllers/actors');
const messageController = require('../controllers/message');
module.exports = () => {
    router.use((req, res, next) => {
    console.info('New request arrived');
    //
    //redis.set('foo', 'bar');
    //
        next();
    });
    router.get('/', (req, res) => {
        fs.readFile('./index.html', function(err) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset="UTF-8"' });
                res.write(err.message);
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
                res.end(fs.readFileSync("./index.html"));
            }
        });
        //let data = actorsController.getActorByName(req, res);
    });

    router.post('/register', (req, res) => {
        actorsController.registerUser(req, res);
    });
    router.post('/login', (req, res) => {
        actorsController.getActorByName(req, res);
    });
    router.post('/user/logout', (req, res) => {
        actorsController.updateUserInfo(req.body.uuid,{online:0},req,res)  
    });
    router.post('/more/message', (req, res) => {
        messageController.getMsgList(req, res);
    });
    router.get('/actors/:year/:country', (req, res) => {
        actorsController.getActorsByYearAndCountry(req, res);
    });
    // router.post('/user/list', (req, res) => {
    //     //actorsController.getUserlist(req, res);
    // });
    router.use((req, res, next) => {
        readFile(res, req)
    });
    return router
}