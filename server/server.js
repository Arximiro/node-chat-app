const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMessage', (msg) => {
        console.log(msg);

        io.emit('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);;
});

// http is used instead of the normal express and app.listen() because it is needed for websockets to be integrated into the server.
// without doing it this way express will just auto setup the server backend, to have the control to add websockets http needs to be accessed.
// socketIO() takes the http server in as an argument and that is stored on the io variable.
// io.on() can listen for events and then respond when they occur, the most popular is connection. Listen for connection and do x.
// when connected in the callback function access to that socket or connection is provided.
// socket.emit() emits a new event
// socket.on() listens for events similar to io.on()

// io.emit() can emit events to all connected users, while socket.emit() is just for an individual connection.