const config = {
    verbose: true,
    testPathIgnorePatterns: [
        '/node_modules/',
        'messages-api-client.integration.test.js',
        'persistence-dynamo.integration.test.js',
        '.aws-sam',
    ],
};

module.exports = config;
