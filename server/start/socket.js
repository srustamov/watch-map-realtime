"use strict";

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/
const Server = use('Server')

const io = require('socket.io')(Server.getInstance())

io.on("connection", (socket) => {
    socket.on("make-location", (message) => {
        let data = JSON.parse(message);
        data.socket_id = socket.id;
        io.emit("location", data);
    });
    socket.on("safe-area", (message) => {
        io.to(message.id).emit("notification", `This is ${message.name} area`);
    });

    socket.on("disconnect", () => {
        io.emit("leave", socket.id);
    });
});