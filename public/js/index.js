const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');   
});

socket.on('newMessage', (msg) => {
    const formattedTime = moment(msg.createdAt).format('h:mm a');
    const li = $('<li></li>');
    li.text(`${msg.from} ${formattedTime}: ${msg.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', (msg) => {
    const formattedTime = moment(msg.createdAt).format('h:mm a');
    const li = $('<li></li>');
    const a = $('<a target="_blank">My current Location</a>');

    li.text(`${msg.from} ${formattedTime}: `);
    a.attr('href', msg.url);
    li.append(a);

    $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
    e.preventDefault();
    const messageTextbox = $('#message')

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, () => {
        messageTextbox.val('');
    });
});

const locationButton = $('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});