const {
    MessagesApiClientBus,
} = require('./messages-api-client/messages-api-client-bus');
const {
    MessagesApiMtProcessor,
} = require('./mt-processor/messages-api-mt-processor');
const AWS = require('aws-sdk');
const eventBus = require('./event-bus/event-bus');
const DynamoAssociationPersistence = require('./association-persistence/association-persistence-dynamo');
const {
    AssociationPersistenceBus,
} = require('./association-persistence/association-persistence-bus');
const MessagesApiCallbackProcessor = require('./callback-processor/messages-api-callback-processor');
const CallbackSenderWebsocket = require('./callback-sender/callback-sender-websocket');
const { CallbackSenderBus } = require('./callback-sender/callback-sender-bus');

const dynamoDBClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION,
});
const websocketApiId = process.env.WEBSOCKET_API_ID;
const websocketStage = process.env.WEBSOCKET_STAGE;
const managementApi = new AWS.ApiGatewayManagementApi({
    region: process.env.AWS_REGION,
    apiVersion: '2018-11-29',
    endpoint: `https://${websocketApiId}.execute-api.${process.env.AWS_REGION}.amazonaws.com/${websocketStage}`,
});

const tableName = process.env.TABLE_NAME;
console.log(`Table name: ${tableName}`);
const associationPersistence = new DynamoAssociationPersistence(
    tableName,
    dynamoDBClient
);
new AssociationPersistenceBus(eventBus, associationPersistence);

const messagesApiHost = process.env.MESSAGES_API_HOST;
console.log(`Messages API host: ${messagesApiHost}`);
new MessagesApiClientBus(process.env.MESSAGES_API_HOST, eventBus);

const inboundStage = process.env.INBOUND_STAGE;
const inboundApiId = process.env.INBOUND_API_ID;
const messagesApiMtProcessor = new MessagesApiMtProcessor(
    eventBus,
    `https://${inboundApiId}.execute-api.${process.env.AWS_REGION}.amazonaws.com/${inboundStage}/callback`
);
const messagesApiCallbackProcessor = new MessagesApiCallbackProcessor(eventBus);
const callbackSender = new CallbackSenderWebsocket(managementApi);
new CallbackSenderBus(eventBus, callbackSender);

module.exports = { messagesApiMtProcessor, messagesApiCallbackProcessor };
