const http = require('http');
const fs = require('fs');
const url = require('url');
const cp = require('child_process');

http.createServer((req, res) => {
      const child = cp.fork('./child.js');
      child.send({
        method: req.method,
        params: req.url
      });
      res.statusCode = 200;
      res.end();
    }).listen(80, () => {
      console.log("Server Started!");
    });
