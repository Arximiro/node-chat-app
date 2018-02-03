const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');   
});

socket.on('newMessage', (msg) => {
    console.log(msg);
    const li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    $('#messages').append(li);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

$('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, () => {
    
    });
});