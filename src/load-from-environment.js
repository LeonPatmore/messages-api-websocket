const {
    MessagesApiClientBus,
} = require('./messages-api-client/messages-api-client-bus');
const MessagesApiMtProcessor = require('./messages-api-mt-processor');

const eventBus = require('./event-bus');
const messagesApiHost = process.env.MESSAGES_API_HOST;
console.log(`Messages API host: ${messagesApiHost}`);
new MessagesApiClientBus(process.env.MESSAGES_API_HOST, eventBus);

const messagesApiMtProcessor = new MessagesApiMtProcessor(eventBus);

module.exports = messagesApiMtProcessor;
