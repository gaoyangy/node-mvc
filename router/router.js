const router = require('../lib/router')((err, req, res) => {
    console.error(err);
    res.statusCode = 500;
    res.end(err);
});
const fs = require('fs')
    //
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
module.exports = () => {
    router.use((req, res, next) => {
        console.info('New request arrived');
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

    router.post('/actors', (req, res) => {
        actorsController.getActorByName(req, res);
    });
    router.get('/actors', (req, res) => {
        actorsController.getActorByName(req, res);
    });
    router.get('/actors/:year/:country', (req, res) => {
        actorsController.getActorsByYearAndCountry(req, res);
    });

    router.use((req, res, next) => {
        res.statusCode = 404;
        res.end();
    });
    return router
}