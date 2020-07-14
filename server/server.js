'use strict'

const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
    .appRoot(__dirname)
    // .wsServer()
    .preLoad('start/socket')
    .fireHttpServer()
    .catch(console.error)