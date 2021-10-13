const {
    SEND_MESSAGES_API_MT_EVENT,
} = require('../messages-api-client/messages-api-client-bus');
const {
    PERSIST_EVENT_NAME,
} = require('../association-persistence/association-persistence-bus');

class HttpError extends Error {
    constructor(status, body) {
        this.status = status;
        this.body = body;
    }
}

class FailedToSendMessagesApi extends HttpError {}

const WEBHOOK_VERSION = 'v1';

class MessagesApiMtProcessor {
    constructor(eventBus, webhook_url) {
        this.eventBus = eventBus;
        this.webhook_url = webhook_url;
    }

    async process(request) {
        const requestBody = this.injectWebhookIntoRequest(request.input.body);
        const res = await this.sendRequestToMessagesApi(
            requestBody,
            request.input.auth
        );
        await this.persistUuid(
            res.data.message_uuid,
            request.context.connectionId
        );
        return res;
    }

    injectWebhookIntoRequest(body) {
        return {
            ...body,
            ...{
                webhook_url: this.webhook_url,
                webhook_version: WEBHOOK_VERSION,
            },
        };
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
