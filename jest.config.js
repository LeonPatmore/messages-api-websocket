const config = {
    verbose: true,
    testPathIgnorePatterns: [
        '/node_modules/',
        'onConnect.integration.test.js',
        '.aws-sam',
    ],
};

module.exports = config;
