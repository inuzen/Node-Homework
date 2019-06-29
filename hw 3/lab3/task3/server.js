const http = require('http');
const cp = require('child_process');
const url = require('url');

const child = cp.fork('./child.js');

let childReady = false;

function whenReady(status) {
  if (status === 'ready') {
    childReady = true;
    child.off('message', whenReady);
    console.log("Server ready");
  }

}

child.on('message', whenReady);

http.createServer((req, res) => {
  let _get = url.parse(req.url, true).query;
  console.log('Request Parameters: ' + JSON.stringify(_get));
  if (!(_get.num1 && _get.num2)) {
    console.log('Bad request');
    res.statusCode = 404;
    res.end();
    return;
  }
  if (!childReady) {
    console.log("Service Unavaliable");
    res.statusCode = 503;
    res.end();
    return;
  }

  let expression = `${_get.num1}+${_get.num2}=`;

  function responseFromChild(data) {

    if (data.expression === expression) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(`<h1>${data.result}</h1>`);
      res.end();
      child.off('message', responseFromChild);

    }
  }
  child.send({expression});
}).listen(80, () => {
  console.log("Server is running");
});
