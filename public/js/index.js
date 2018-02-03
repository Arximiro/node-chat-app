const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: "smallbilly",
        text: 'hell yah! im on my way'
    });
});


socket.on('newMessage', (msg) => {
    console.log(msg);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});