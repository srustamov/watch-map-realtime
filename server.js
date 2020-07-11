const port = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'
const api = require(__dirname + '/api/index');

const http = require('http')
let app = require('express')()
const server = http.createServer(app)
const io = require('socket.io')(server)

const {
    Nuxt,
    Builder
} = require('nuxt')
const config = require('./nuxt.config.js');
config.dev = !isProd

const nuxt = new Nuxt(config)
    // Start build process in dev mode
if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
}


app = api(app);


app.use(nuxt.render)



server.listen(port)

console.log('Server listening on localhost:' + port)

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