
const AWS = require('aws-sdk');

const dynamoDBClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });
const tableName = process.env.TABLE_NAME
const messagesApiHost = process.env.MESSAGES_API_HOST

exports.handler = async event => {
    console.log(`Processing`)
    console.log(JSON.stringify(event))
    console.log(`Connection ID ${event.requestContext.connectionId}`)
    return { statusCode: 200, body: 'Connected.' };
};
