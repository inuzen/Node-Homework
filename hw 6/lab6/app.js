let express = require('express');
let mustacheExpress = require('mustache-express'); //подключаемшаблонизатор
let bodyParser = require('body-parser'); //подключаемпарсертелаPOST запросов

let app = express(); //подключаем модуль роутера по работе с виджетами
let widgetRoute = require('./routes/widgets.js'); //регистрируем модуль шаблонизации Mustacheв Express

app.set('views', __dirname + '/views');

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache'); //регистрируем модуль парсерателаPOSTзапросов

app.use(bodyParser.urlencoded({
  extended: false
})); //регистрируемроутерпопути: /widgets
app.use('/widgets', widgetRoute); //вешаем обработчик отдачи стартовой страницы

app.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Task:'
  });
});
app.listen(3000);
