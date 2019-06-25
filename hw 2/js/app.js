let http = require('http');
let fs = require('fs');

http.createServer((request, response) => {
  let pathname = '../data.txt';
  let numbers= [];
  console.log("Request: " + request.url);
  fs.readFile(pathname, 'utf8', (err, data) => {
    if (err) {
      console.log('Could not find or open file for reading\n');
      response.statusCode = 404;
      response.end();
    } else {
      for (let num of data.split(" ")){
        if (!isNaN(num) && num !== undefined){
          numbers.push(parseInt(num));
        } else continue;
      }
      let out1 = [];
      numbers.forEach((num) => {
        if(num%2===0) out1.push(num);
      })
      let out2 = numbers.map((num) => {
        return num**3;
      });

      console.log(out1);
      fs.writeFile('../out-1.txt', out1.join(" "), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
      fs.writeFile('../out-2.txt', out2.join(" "), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.end("Writing complete");
    }
  });
}).listen(8080, () => {
  console.log("HTTP server works in 8080 port!\n");
});
