const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('A new client connected');

    ws.send('Connection to the WebSocket server successful.');

    wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send('New user has entered the chat.');
        }
    });

    ws.on('message', (message) => {
        if (Buffer.isBuffer(message)) {
            message = message.toString();
        }
        console.log('Client message: ', message);

        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('User disconnected.');
    });
});
