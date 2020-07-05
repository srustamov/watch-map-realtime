const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('make-location', (message) => {
        let data = JSON.parse(message);
        io.emit('location', data)
    });
});



http.listen(3000, () => {
    console.log('listening on *:3000');
});