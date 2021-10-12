const DynamoAssociationPersistence = require('../../src/association-persistence/association-persistence-dynamo');
const AWS = require('aws-sdk');
const dynamoDBClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: 'eu-west-1',
});
var uuidv4 = require('uuid/v4');

const TEST_CONNECTION_ID = 'connTest';

const associationPersistence = new DynamoAssociationPersistence(
    'Association',
    dynamoDBClient
);

test('Test persist and get', async () => {
    const uuid = uuidv4();
    console.log(`Testing with random id [ ${uuid} ]`);
    await associationPersistence.persist(uuid, TEST_CONNECTION_ID);

    const association = await associationPersistence.get(uuid);
    console.log(JSON.stringify(association));
    expect(association.uuid).toEqual(uuid);
    expect(association.connectionId).toEqual(TEST_CONNECTION_ID);
});
