const port = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'
const makeApi = require(__dirname + '/api/index');
const startSocketIo = require(__dirname + '/api/socket');
const http = require('http')
let app = require('express')();
const server = http.createServer(app)
const io = require('socket.io')(server)

const {
  Nuxt,
  Builder
} = require('nuxt')
const config = require('./nuxt.config.js');
config.dev = !isProd

const nuxt = new Nuxt(config)
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}


app = makeApi(app);

app.use(nuxt.render)

server.listen(port)

console.log('Server listening on localhost:' + port)

startSocketIo(io);
