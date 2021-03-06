const http = require('http');
const fs = require('fs');
const filename = '../index.html';
const files = ['../header.html', '../body.html', '../footer.html']
const htmlStart = `<!DOCTYPE html>
                   <html lang="en" dir="ltr">
                   <head>
                   <meta charset="utf-8">
                   <title>some title</title>
                   </head>
                   <body>`;

const htmlEnd = `</body>
                </html>`

let html = "";


let promArr = files.map(function(filename){
  return new Promise((resolve, reject) => {

    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        console.log('Couldnt locate or open file for reading\n');
        reject("Reject");
      } else {
        console.log('The file ' + filename + ' is read and sent to the client \n');
        resolve(data);
      }
    });

 })
});



http.createServer((request, response) => {

  html+= htmlStart;
  Promise.all( promArr )
    .then(result => {
      result.forEach((res) => {
        html+=res;
      })
    });
  html+= htmlEnd;
  
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  response.end(html);
  console.log('Request accepted');
}).listen(8080, () => {
  console.log("HTTP server works in 8080 port \n");
});
