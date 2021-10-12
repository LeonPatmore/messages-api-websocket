class DynamoAssociationPersistence {
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

    async get(uuid) {
        return this.client
            .get({
                TableName: this.tableName,
                Key: {
                    uuid,
                },
            })
            .promise()
            .then((res) => {
                return res.Item;
            });
    }
}

module.exports = DynamoAssociationPersistence;
