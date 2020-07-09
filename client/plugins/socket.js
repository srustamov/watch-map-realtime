import io from 'socket.io-client'


window.$socket = io();
$socket.on('connection', () => {
    console.log('connection')
})