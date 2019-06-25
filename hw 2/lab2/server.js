let http = require('http');
let fs = require('fs');
let path = require('path');

let mimeTypes = {
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};


http.createServer((request, response) => {
  // let pathname = 'site/index.html';
  let pathname = "",
    extname, mimeType;
  console.log("Request: " + request.url);
  pathname = (request.url === '/') ? 'site/index.html' : 'site' + request.url;


  extname = path.extname(pathname);
  mimeType = mimeTypes[extname];
  if (extname === '.png' || extname === '.gif' || extname === '.ico') {
    try {
      let img = fs.readFileSync(pathname);
      // console.log("img sent to client");
      response.writeHead(200, {
        'Content-Type': mimeType
      })
      response.end(img);
    } catch (e) {
      // console.log("Couldnt open image\n");
      response.statusCode = 404;
      response.end();
    }
  } else {
    fs.readFile(pathname, 'utf8', (err, data) => {
      if (err) {
        // console.log('Could not find or open file for reading\n');
        response.statusCode = 404;
        response.end();
      } else {
        // console.log(`The file ${pathname} is read and sent to the client\n`);
        // console.log(mimeTypes[path.extname(pathname)]);
        response.writeHead(200, {
          'Content-Type': mimeTypes[path.extname(pathname)]
        });
        response.end(data);
      }
    });
  }
}).listen(8080, () => {
  console.log("HTTP server works in 8080 port!\n");
});
