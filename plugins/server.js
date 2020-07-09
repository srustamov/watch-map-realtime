const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const consola = require("consola");

io.on("connection", socket => {
    console.log('connection')
});

server.listen(port, () => {
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
});
