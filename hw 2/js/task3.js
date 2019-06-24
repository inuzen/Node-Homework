const eventsObj = {};

on('eat', stringData => {
    console.log('Первым: Я кушаю  ' + stringData + '.');
});

on('eat', stringData => {
    console.log('Вторым: Я кушаю  ' + stringData + '.');
});

setTimeout(() => {
    emit('eat', 'бутерброд');
}, 3000);

setTimeout(() => {
    emit('eat', 'мясо');
}, 2000);

setTimeout(() => {
    emit('eat', 'яблочко');
}, 500);


function on(eventName, callback) {
    //Инициализируем пустой массив обработчиков у регистрируемого события
    eventsObj[eventName] = eventsObj[eventName] || [];
    //Здесь нужно положить функцию обратного вызова в соответствующий массив
    //Здесь нужен ваш код
}

function emit(eventName, stringData) {
    //Здесь необходимо запустить каждую функцию обработчик относящиеся к данному событию
    //Здесь нужен ваш код
}
