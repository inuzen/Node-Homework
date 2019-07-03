const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const mimeType = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg'
}

http.createServer((req, res) => {
  let pathname, ext;
  // console.log(req.headers);
  // console.log(req.headers.range);
  if (req.url === '/') {
    pathname = "site/index.html";
  } else pathname = "site" + req.url;

  ext = path.extname(pathname);
  if (ext === '.mp4' || ext === '.mp3') {
    // fs.readFile(pathname, (err, data) => {
    //   if (err) {
    //     console.log('Couldnt open file');
    //     res.statusCode = 404;
    //     res.end();
    //   }
    //   console.log(pathname + ' is read');
    //   res.writeHead(200, {
    //     'Content-Type': mimeType[ext]
    //   });
    //   res.end(data);
    // });

    if (!fs.existsSync(pathname)) {
      console.log("couldnt find file");
      res.statusCode = 404;
      res.end();
      return null;
    }
    let responseHeaders = {};

    let stat = fs.statSync(pathname);
    let rangeRequest = readRangeHeader(req.headers['range'], stat.size);
    if (rangeRequest == null) {
      responseHeaders['Content-Type'] = mimeType[ext];
      responseHeaders['Content-Length'] = stat.size;
      responseHeaders['Accept-Ranges'] = 'bytes';

      let video = fs.readFileSync(pathname);
      console.log("video sent to client");
      res.writeHead(200, responseHeaders);
      res.end(video);
      return null;
    }

    let start = rangeRequest.start,
      end = rangeRequest.end;

    if (start >= stat.size || end >= stat.size) {
      responseHeaders['Content-Range'] = 'bytes */' + stat.size;
      console.log("Return the 416 'Requested Range Not Satisfiable'");
      res.writeHead(416, responseHeaders);
      res.end();
      return null;
    }

    let maxsize = 10240;
    if (end-start>=maxsize) {
      end= start+maxsize-1;
    }

    responseHeaders['Content-Range'] = 'bytes '+start+'-'+end+'/'+stat.size;
    responseHeaders['Content-Length'] = start==end?0: (end-start+1);
    responseHeaders['Content-Type'] = mimeType[ext];
    responseHeaders['Accept-Ranges'] = 'bytes';
    responseHeaders['Cache-Control'] = 'no-cache';

    const fd = fs.openSync(pathname, 'r');
    let buf = Buffer.alloc(responseHeaders['Content-Length']);

    fs.read(fd,buf,0,buf.length, start, (err,bytes) => {
      if (err) {
        console.log(err);
        res.statusCode=500;
        res.end();
      } else {
        console.log(responseHeaders);
        res.writeHead(206, responseHeaders);
        res.end(buf);
      }
    });

  } else {
    fs.readFile(pathname, 'utf-8', (err, data) => {
      if (err) {
        console.log('Couldnt open file');
        res.statusCode = 404;
        res.end();
      }
      console.log(pathname + ' is read');
      res.writeHead(200, {
        'Content-Type': mimeType[ext]
      });
      res.end(data);
    });
  }


}).listen(80, () => {
  console.log("Server Started!");
});


function readRangeHeader(range, totalLength) {
  if (range == null || range.length == 0) return null

  let arr = range.split(/bytes=([0-9]*)-([0-9]*)/);
  console.log(arr);
  let startRange = parseInt(arr[1]);
  let endRange = parseInt(arr[2]);
  let result = {
    start: isNaN(startRange) ? 0 : startRange,
    end: isNaN(endRange) ? (totalLength - 1) : endRange
  };

  if (isNaN(startRange) && !isNaN(endRange)) {
    result.start = totalLength - endRange;
    result.end = totalLength - 1;
  }

  return result

}
