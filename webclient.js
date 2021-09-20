const WebSocketClient = require('websocket').client;

const WEBSOCKET_URL = "wss://twt48trjg0.execute-api.eu-west-1.amazonaws.com/test"
const client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('OG Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
});

client.connect(WEBSOCKET_URL);
