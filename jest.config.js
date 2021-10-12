const config = {
    verbose: true,
    testPathIgnorePatterns: [
        '/node_modules/',
        'messages-api-client.integration.test.js',
        'association-persistence-dynamo.intergration.test.js',
        'callback-sender-websocket.integration.test.js',
        '.aws-sam',
    ],
};

module.exports = config;
