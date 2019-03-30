const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 8080;
const server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let extname = path.extname(pathname);
    if(pathname == '/') {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(fs.readFileSync(path.join(__dirname, pathname, 'index.html')));
    } else if( extname == '.png') {
        res.writeHead(200, { 'Content-Type': 'image/png'  });
        res.end(fs.readFileSync(path.join(__dirname+'/img', pathname)));
    } else {
        res.statusCode = 404;
        res.end();
    }

});
server.listen(port, hostname, () => {
    console.log('server running at http://${hostname}:${port}');
})