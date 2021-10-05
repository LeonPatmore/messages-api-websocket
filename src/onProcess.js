const AWS = require('aws-sdk');
const axios = require('axios').default;
const MessagesApiMtProcessor = require('./messages-api-mt-processor');
const messagesApiClient = require('./messages-api/messages-api-client-environment');

const dynamoDBClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION,
});
const tableName = process.env.TABLE_NAME;

const messagesApiMtProcessor = new MessagesApiMtProcessor(messagesApiClient);

exports.handler = async (event) => {
    console.log(`Processing event [ ${JSON.stringify(event)} ]`);

    const connectionId = event.context.connectionId;
    console.log(`Connection ID ${connectionId}`);

    const authentication = event.authentication;
    console.log(`Authentication: ${authentication}`);

    const body = event.body;
    console.log(`Body ${body}`);

    proces;

    return {
        statusCode: 200,
        body: `Connected with id ${event.context.connectionId}`,
    };
};
