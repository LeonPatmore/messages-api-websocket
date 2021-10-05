class MessagesApiMtProcessor {
    constructor(messagesApiClient) {
        this.messagesApiClient = messagesApiClient;
    }

    async process(request) {
        const uuid = messagesApiClient.sendV1(
            request.body,
            request.authentication
        );
    }
}

module.exports = MessagesApiMtProcessor;
