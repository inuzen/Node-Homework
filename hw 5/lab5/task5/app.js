let express = require('express');
let mustacheExpress = require('mustache-express');

let app = express();

let bodyParser = require('body-parser');
let route = require('./routes/register.js');


app.set('views', __dirname+'/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

app.use('/register',route);

app.listen(80);

//mustache


// app.get('/', (req,res,next) => {
//   res.render('index', {title:'First experience with mustache'});
// });
