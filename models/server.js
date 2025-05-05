const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {

        this.app = express();;
        this.port = process.env.PORT || 8080;

        // http server
        this.server = http.createServer(this.app);

        // socket server
        this.io = socketIO(this.server, { /* configuraciones */ });

    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));

    }

    socketConfig() {
        new Sockets(this.io);
    }

    execute() {
        // inicializar middlewares
        this.middlewares();

        // inicializar sockets
        this.socketConfig();

        // inicializar servicio
        this.server.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto ', this.port);
        });
    }
}

module.exports = Server;