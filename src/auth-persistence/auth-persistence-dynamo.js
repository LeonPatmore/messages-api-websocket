class AuthPersistenceDynamo {
    constructor(tableName, client) {
        this.tableName = tableName;
        this.client = client;
    }

    async persist(auth, connectionId) {
        return this.client
            .put({
                TableName: this.tableName,
                Item: {
                    auth,
                    connectionId,
                },
            })
            .promise();
    }

    async get(connectionId) {
        return this.client
            .get({
                TableName: this.tableName,
                Key: {
                    connectionId,
                },
            })
            .promise()
            .then((res) => {
                return res.Item.auth;
            });
    }
}

module.exports = AuthPersistenceDynamo;
