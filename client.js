const WebSocket = require('ws');
const readline = require('readline');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log('Connection to server successful!');
});

ws.on('message', (data) => {
    console.log(`Received: ${data}`);
});

ws.on('close', () => {
    console.log('Disconnected from server');
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptUser = () => {
    rl.question('You: ', (message) => {
        if (message.trim().toLowerCase() === 'exit') {
            ws.close();
            rl.close();
            return;
        }
        ws.send(message);
        promptUser();
    });
};

promptUser(); 
