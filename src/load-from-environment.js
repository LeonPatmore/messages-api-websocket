const {
    MessagesApiClientBus,
} = require('./messages-api-client/messages-api-client-bus');
const {
    MessagesApiMtProcessor,
} = require('./processor/messages-api-mt-processor');
const AWS = require('aws-sdk');
const eventBus = require('./event-bus/event-bus');
const DynamoPersistence = require('./persistence/persistence-dynamo');
const { PersistenceBus } = require('./persistence/persistence-bus');

const dynamoDBClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION,
});
const tableName = process.env.TABLE_NAME;
console.log(`Table name: ${tableName}`);
const dynamoPersistence = new DynamoPersistence(tableName, dynamoDBClient);
new PersistenceBus(eventBus, dynamoPersistence);

const messagesApiHost = process.env.MESSAGES_API_HOST;
console.log(`Messages API host: ${messagesApiHost}`);
new MessagesApiClientBus(process.env.MESSAGES_API_HOST, eventBus);

const messagesApiMtProcessor = new MessagesApiMtProcessor(eventBus);

module.exports = messagesApiMtProcessor;
