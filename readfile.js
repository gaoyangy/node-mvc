const fs=require("fs");
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
    "eot": "image/x-eot",
    "ttf": "image/x-ttf",
    "woff": "image/x-woff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

module.exports = (res, req) => {
    for (let fileType in MIME_TYPE) {
        if (req.url.includes('.'+fileType)) {
            fs.readFile('.'+req.url, function(err) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': `${MIME_TYPE[fileType]}; charset="UTF-8"` });
                    res.write(err.message);
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': `${MIME_TYPE[fileType]}; charset="UTF-8"` });
                    res.end(fs.readFileSync('.'+req.url));
                }
            });
        }
    }
};