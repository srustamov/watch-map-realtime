const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

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

http.listen(3001, () => {
    console.log("listening on *:3001");
});