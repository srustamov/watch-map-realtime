const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const io = require('socket.io')(server)
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
const bodyParser = require('body-parser');

app.use(bodyParser);



server.listen(3001)
