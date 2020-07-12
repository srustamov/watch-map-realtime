const makeApi = require(__dirname + '/api/index');
const startSocketIo = require(__dirname + '/api/socket');
const http = require('http')
const app = require('express')();
const server = http.createServer(app)
const io = require('socket.io')(server)

const {
  Nuxt,
  Builder
} = require('nuxt')
const config = require('./nuxt.config.js');

config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}


const api = makeApi(app);

api.use(nuxt.render)

server.listen(3001)

startSocketIo(io);

console.log('Server listening on localhost:' + 3001)
