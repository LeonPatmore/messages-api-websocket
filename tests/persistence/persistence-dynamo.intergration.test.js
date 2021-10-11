const DynamoPersistence = require('../../src/persistence/persistence-dynamo');
const AWS = require('aws-sdk');
const dynamoDBClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: 'eu-west-1',
});

const dynamoPersistence = new DynamoPersistence('Association', dynamoDBClient);

test('Test can persist', async () => {
    await dynamoPersistence.persist('1234', 'conn');
});
