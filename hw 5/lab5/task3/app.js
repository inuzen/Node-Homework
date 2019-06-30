let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let route = require('./routes/register.js');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

app.use('/register',route);

app.listen(80);
