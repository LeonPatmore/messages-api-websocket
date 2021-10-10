const {
    SEND_MESSAGES_API_MT_EVENT,
} = require('./messages-api-client/messages-api-client-bus');

class MessagesApiMtProcessor {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    async process(request) {
        const res = await this.sendRequestToMessagesApi(request);
        await this.persistUuid(res.data.uuid, request.context.connectionId);
        return res.data;
    }

    async sendRequestToMessagesApi(request) {
        return await new Promise((resolve, reject) => {
            this.eventBus.emit(
                SEND_MESSAGES_API_MT_EVENT,
                request.body,
                request.auth,
                resolve,
                reject
            );
        });
    }

    async persistUuid(uuid, connectionId) {
        return await new Promise((resolve, reject) => {
            this.eventBus.emit(
                'persist-uuid-connection',
                uuid,
                connectionId,
                resolve,
                reject
            );
        });
    }
}

module.exports = MessagesApiMtProcessor;
