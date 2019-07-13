let socket = io.connect('http://localhost:8080');
arr = ['john', 'fred', 'welma', 'thomas', 'jessica', 'dafny', 'scooby', 'shaggy'];
$("#send_btn").on('click', (e) => {
  e.preventDefault();

  sendMessage({msg: $('#message').text()
});
});


$(document).on('keydown', (e) => {
  // console.log(e.keyCode);
  if (e.keyCode === 13) {
    $("#message").blur();
    sendMessage({msg: $('#message').text()});
  }
});


socket.on('update_chat', (msg) => {
  console.log(msg);
    $('#message-field').append(`<div class="msg-container ${msg.mine}" >
                                <p class="name">${msg.name}</p>
                                <p class="text-msg ${msg.mine}">${msg.msg}</p>
        </div>`);
});

function sendMessage(msg) {
  socket.emit('message', msg);
}
