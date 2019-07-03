const https = require('https');
const cheerio = require('cheerio');

https.get('https://market.yandex.ru/product--igrovaia-pristavka-sony-playstation-4-slim-1-tb/14211948', (response)=>{
    let html = '';

    response.on('data', (chunk)=>{
        html  += chunk;
    });
    response.on('end', ()=>{
        let $ = cheerio.load(html);
        console.log($('.title.title_size_28.title_bold_yes').text());
    });


});

var http = require("http");
var fs = require('fs');
var url = require("url");
var path = require('path');

var mimeTypes = {
	'.js' : 'text/javascript',
	'.html' : 'text/html',
	'.css' : 'text/css' ,
	'.jpg' : 'image/jpeg',
	'.gif' : 'image/gif'
};

http.createServer(function onRequest(request, response) {
	if(request.method === 'GET') {
		var postData = "";
		var pathname = url.parse(request.url).path;
		if(pathname == '/')
			pathname = '/site/index.html';
    else pathname = '/site' + pathname;


		var extname = path.extname(pathname);
		var mimeType = mimeTypes[extname];
		//чтобы убрать начальный слэш
		pathname = pathname.substring(1, pathname.length);

		if( (extname == ".gif") || (extname==".jpg") ) {
			var img = fs.readFileSync('./' + pathname);
			response.writeHead(200, {'Content-Type': mimeType});
			response.end(img, 'binary');
		} else {
			fs.readFile(pathname, 'utf8', function (err, data){
				if (err) {
					console.log('Could not find or open file '+
					pathname + ' for reading\n');
				} else {
					response.writeHead(200, {'Content-Type': mimeType});
					response.end(data);
				}
			});
		}
	} else if (request.method === 'POST') {
		var pathname = url.parse(request.url).path;
		//чтобы убрать начальный слэш
		pathname = pathname.substring(1, pathname.length);
		var newFileStream = fs.createWriteStream(pathname);

		request
			.on('readable', function(){
				 var chunk;
				 while((chunk = request.read()) !== null) {
					newFileStream.write(chunk);
				 }
			})
			.on('end', function(){
				newFileStream.end();
				response.writeHead(200);
				response.end();
			});
	}
}).listen(8080);
