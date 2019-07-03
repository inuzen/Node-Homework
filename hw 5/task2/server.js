const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

http.createServer(responser).listen(80);
console.log("Server started");
const mimeType = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'application/javascript'
}

function responser(req, res) {
  let path, ext;
  console.log(req.url);
  console.log(req.method);
  if (req.method === "GET") {
    if (req.url === '/') {
      path = 'index.html';
    } else {
      path = req.url;
    }
    console.log(path);
    ext = path.split('.').pop();

    fs.readFile(path, 'utf-8', function(err, data) {
      if (err) {
        res.statusCode = 404;
        return res.end("Ops!!!");
      }
      res.writeHead(200, {
        'Content-Type': mimeType[ext]
      });
      res.end(data);
    });
  } else {

    if (req.url === "/calc") {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
      });
      req.on('end', () => {
        console.log(body);
        let expObj = querystring.parse(body)
        res.writeHead(200, {
          'Content-Type': "text/html"
        });

        let convertResult = convert(expObj.expression)
        console.log(convertResult);
        let calculated = calc(convertResult);

        res.end(`<p>Original expression: ${expObj.expression}</p>
          <p>Converted expresson: ${convertResult}</p>
          <p>Calculated from transformed: ${calculated}</p>`);
      });


    } else {
      res.statusCode = 404;
      return res.end("Ops!!!");
    }
  }



}

let test1 = '( - 10 + 21 ) // 100 - 38';
let test2 = '35 4 28 * 1 5 - 2 ^ / +';
const opPrecedence = {
  "^": 9,
  "*": 8,
  "/": 8,
  "//": 8,
  "%": 8,
  "+": 6,
  "-": 6,
  "(": -1,
  ")": "?"
}
function convert(exp) {
  let stack = [];
  let expression = exp.split(/((?<!\d)|(?!\d))(?!\/+)(?<!\s)(?!\s)/).filter(s=> s!=="").join(" ").split(" ");
  console.log(expression);
  let res="";
  for (el of expression) {
    console.log("New element: "+el);
    if (!isNaN(el)) {
      res+=el+" ";
    }
    else {
      if (el==="(") {
        stack.push(el);
        console.log(stack);
      } else if(el===")"){
        while(stack[stack.length - 1]!=="("){
          res += stack.pop()+" ";
        }
        stack.pop();
        console.log(stack);
        continue;
      }else{
        while (opPrecedence[el] <= opPrecedence[stack[stack.length - 1]]) {
          res += stack.pop()+" ";
          console.log(stack);
        }
        stack.push(el);
        console.log(stack);
        // res += el;
      }
    }
    console.log("res:"+res);
  }
  stack.reverse().forEach(d=> res+=d+" ");
  // console.log(res.split(/(?=d+)/).join(" "));
return res;
}

function calc(exp) {
  let stack = [];
  let temp = "", el1="", el2="";

  let expression = exp.split(" ");

  for (el of expression) {
    if (!isNaN(el)) {
      stack.push(el)
    } else {
      el === "^" ? el = "**" : el;
      el2 = stack.pop();
      el1 = stack.pop();

      if(isNaN(el1)) el1 = "0";
      if (el1<0) el1= "("+el1+")";
      if (el === "//")
        temp = Math.floor(el1 / el2);
      else{
        temp = el1 + el + el2;
      }
      stack.push(eval(temp)+"");
    }

  }
  return stack.toString();
}
