const http = require("http");
const app = require("express")();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(9091, () => {
    console.log('Listening... on 9091');
})
const websocketServer = require("websocket").server;
const httpServer = http.createServer();

httpServer.listen(9090, () => {
    console.log('Listening... on 9090');
});

const wsServer = new websocketServer({
    "httpServer": httpServer
});

let clients = {};

wsServer.on('request', request => {
    const connection = request.accept(null, request.origin);

    connection.on('open', event => {
        console.log('Opened...');
        console.log(event);
    })
    connection.on('close', event => {
        console.log('Closed...');
        console.log(event);
    })
    connection.on('message', message => {
        console.log('Message...');
        const result = JSON.parse(message.utf8Data);
        console.log(result);
    })

    // generate new client
    const clientId = 'USER-' + Math.round(Math.random() * 10000000000);
    clients[clientId] = {
        'connection': connection
    }

    const payload = {
        'method': 'connect',
        'clientId': clientId
    }

    connection.send(JSON.stringify(payload));
});