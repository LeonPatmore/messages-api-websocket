class MessagesApiMtProcessor {
    constructor(messagesApiClient) {
        this.messagesApiClient = messagesApiClient;
    }

    async startProcessing(request) {
        const uuid = messagesApiClient.sendV1(
            request.body,
            request.authentication
        );
    }

    async persist() {
        // Now we want to persist uuid and connection id
    }

    async return() {
        // Now return the sync response.
    }
}

module.exports = MessagesApiMtProcessor;
