const CallbackSenderWebsocket = require('../../src/callback-sender/callback-sender-websocket');

const AWS = require('aws-sdk');

const APIGATEWAY_ID = '';
const CONNECTION_ID = '';

const managementApi = new AWS.ApiGatewayManagementApi({
    region: 'eu-west-1',
    apiVersion: '2018-11-29',
    endpoint: `https://${APIGATEWAY_ID}.execute-api.eu-west-1.amazonaws.com/Prod`,
});

const callbackSender = new CallbackSenderWebsocket(managementApi);

test('Testing sending to a websocket', async () => {
    await callbackSender.send('hello', CONNECTION_ID);
});
