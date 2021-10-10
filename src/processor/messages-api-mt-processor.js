const {
    SEND_MESSAGES_API_MT_EVENT,
} = require('../messages-api-client/messages-api-client-bus');

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
        await this.persistUuid(res.data.uuid, request.context.connectionId);
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
                'persist-uuid-connection',
                uuid,
                connectionId,
                resolve,
                reject
            );
        });
    }
}

module.exports = { MessagesApiMtProcessor, FailedToSendMessagesApi };
