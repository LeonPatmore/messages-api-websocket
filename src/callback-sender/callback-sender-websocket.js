class CallbackSenderWebsocket {
    constructor(client) {
        this.client = client;
    }

    async send(callback, connectionId) {
        await this.client
            .postToConnection({
                ConnectionId: connectionId,
                Data: callback,
            })
            .promise();
    }
}

module.exports = CallbackSenderWebsocket;
