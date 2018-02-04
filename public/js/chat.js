const socket = io();

const scrollToBottom = () => {
    // Selectors
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child');

    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();

    if (clientHeight + scrollTop + newMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', () => {
    const params = $.deparam(window.location.search)

    socket.emit('join', params, (err) => {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No Error');
        }
    });
});

// Listens for newMessage event from server.
// Takes the time, formats it to readable, grabs the template's html value from index.html, then renders it with Mustache passing in 3 properties.
socket.on('newMessage', (msg) => {
    const formattedTime = moment(msg.createdAt).format('h:mm a');
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        from: msg.from,
        text: msg.text,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

// Listens for newLocationMessage event from server.
// Takes the time, formats it to readable, grabs the template's html value from index.html, then renders it with Mustache passing in 3 properties.
socket.on('newLocationMessage', (msg) => {
    const formattedTime = moment(msg.createdAt).format('h:mm a');
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        from: msg.from,
        url: msg.url,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

// Targets element with id message-form in index.html, and creats an onSubmit handler for the form.
// in the callback the event is passed in, then the default is prevented to stop the normal form behavior.
// since the element with id message is selected multiple times it is stored in a variable.
// When a message is submitted, the createMessage event is sent to the server including the from and text values
// Lastly the messageTextbox value is set back to empty.
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

// navigator.geolocation is built in and finds a users geolocation.
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

socket.on('updateUserList', (users) => {
    const ol = $('<ol></ol>');

    users.forEach((user) => {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
});
