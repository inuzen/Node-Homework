const http = require('http');
const express = require('express');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

server.listen(8080);
arr = ['john', 'fred', 'welma', 'thomas', 'jessica', 'dafny', 'scooby', 'shaggy'];
app.use(express.static('public'));

const sockets = {}

io.on('connection', (socket) => {
  console.log('new connect');
  sockets[socket.id] = socket;


  socket.on('message', (msg) => {

    msg.id = socket.id;
    msg.name= arr[Math.floor(Math.random()*8)];
    for (soc in sockets) {
       if(sockets[soc].id !== socket.id)
         msg.mine = "";
       else msg.mine = 'mine';

       sockets[soc].emit('update_chat', msg );
    }
  });


});
