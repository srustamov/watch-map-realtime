// const express = require('express')
// const consola = require('console')

// const { Nuxt, Builder } = require('nuxt')

// const app = express();

// const config = require('../nuxt.config');

// // const { config } = require('process');

// config.dev = !(process.env.NODE_ENV === 'production');
// async function start() {
//     const nuxt = new Nuxt(config);

//     const { host, port } = nuxt.options.server;

//     if (config.dev) {
//         const builder = new Builder(nuxt);
//         await builder.build();
//     } else {
//         await nuxt.ready();
//     }

//     app.use(nuxt.render);

//     app.listen(port, host)

//     console.log(`listen http: //${host}:${port}`)

// }

// start();

const { loadNuxt, build } = require("nuxt");

const app = require("express")();
const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

async function start() {
    // We get Nuxt instance
    const nuxt = await loadNuxt(isDev ? "dev" : "start");

    // Render every route with Nuxt.js
    app.use(nuxt.render);

    // Build only in dev mode with hot-reloading
    if (isDev) {
        build(nuxt);
    }
    // Listen the server
    app.listen(port, "0.0.0.0");
    console.log("Server listening on `localhost:" + port + "`.");
}

start();