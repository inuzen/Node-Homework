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
