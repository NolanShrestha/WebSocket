const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('A new client connected');

    ws.send('Hello! You are now connected to the WebSocket server.');

    wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send('A new user has connected to the chat.');
        }
    });

    ws.on('message', (message) => {
        if (Buffer.isBuffer(message)) {
            message = message.toString();
        }
        console.log('Received from client: ', message);

        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('A client disconnected');
    });
});
