class Sockets {

    constructor( io ) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log(socket.id);

            socket.on('chat-message', (data) => {
                console.log(data);

                socket.emit('server-message', {
                    message: data.message.toUpperCase(),
                    name: 'Servidor',
                });

                // this.io.emit('server-message', {
                //     message: "alguien ha escrito",
                //     name: 'Servidor',
                // });

            })
        });
    }

}

module.exports = Sockets;