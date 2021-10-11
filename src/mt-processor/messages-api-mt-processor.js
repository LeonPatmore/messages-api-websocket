const {
    SEND_MESSAGES_API_MT_EVENT,
} = require('../messages-api-client/messages-api-client-bus');
const { PERSIST_EVENT_NAME } = require('../persistence/persistence-bus');

class HttpError extends Error {
    constructor(status, body) {
        this.status = status;
        this.body = body;
    }
}

class FailedToSendMessagesApi extends HttpError {}

class MessagesApiMtProcessor {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    async process(request) {
        const res = await this.sendRequestToMessagesApi(
            request.input.body,
            request.input.auth
        );
        await this.persistUuid(
            res.data.message_uuid,
            request.context.connectionId
        );
        return res;
    }

    async sendRequestToMessagesApi(body, auth) {
        return await new Promise((resolve, reject) => {
            this.eventBus.emit(
                SEND_MESSAGES_API_MT_EVENT,
                body,
                auth,
                resolve,
                reject
            );
        }).catch((error) => {
            throw error;
            // throw new FailedToSendMessagesApi(
            //     error.response.status,
            //     error.response.data
            // );
        });
    }

    async persistUuid(uuid, connectionId) {
        return await new Promise((resolve, reject) => {
            this.eventBus.emit(
                PERSIST_EVENT_NAME,
                uuid,
                connectionId,
                resolve,
                reject
            );
        });
    }
}

module.exports = { MessagesApiMtProcessor, FailedToSendMessagesApi };
