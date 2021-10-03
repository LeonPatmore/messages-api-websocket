const AWS = require("aws-sdk");
const http = require("http");
const axios = require("axios").default;

const dynamoDBClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10",
    region: process.env.AWS_REGION,
});
const tableName = process.env.TABLE_NAME;
const messagesApiHost = process.env.MESSAGES_API_HOST;

exports.handler = async (event) => {
    console.log(`Processing`);
    console.log(JSON.stringify(event));
    console.log(`Connection ID ${event.context.connectionId}`);

    const authentication = event.authentication;
    console.log(`Authentication: ${authentication}`);

    const body = event.body;
    console.log(`Body ${body}`);

    const options = {
        host: messagesApiHost,
        path: "v0.1/messages",
        method: "POST",
    };

    axios.post(`https://${messagesApiHost}/v0.1/messages`);

    return {
        statusCode: 200,
        body: `Connected with id ${event.context.connectionId}`,
    };
};
