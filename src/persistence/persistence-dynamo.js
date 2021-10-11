var AWS = require('aws-sdk');
class DynamoPersistence {
    constructor(tableName, client) {
        this.tableName = tableName;
        this.client = client;
    }

    async persist(uuid, connectionId) {
        return this.client
            .put({
                TableName: this.tableName,
                Item: {
                    uuid,
                    connectionId,
                },
            })
            .promise();
    }
}

module.exports = DynamoPersistence;
