module.exports = function initSocketIo(io) {

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
}