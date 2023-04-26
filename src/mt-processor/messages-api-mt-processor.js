const {
    SEND_MESSAGES_API_MT_EVENT,
} = require('../messages-api-client/messages-api-client-bus');
const {
    PERSIST_EVENT_NAME,
} = require('../association-persistence/association-persistence-bus');
const {
    GET_AUTH_EVENT_NAME,
} = require('../auth-persistence/auth-persistence-bus');

class HttpError extends Error {
    constructor(status, body) {
        super(`HTTP error with response code [ ${status} ]`);
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
        const connectionId = request.context.connectionId;
        const requestBody = this.injectWebhookIntoRequest(request.input);
        const auth = await new Promise((resolve, reject) => {
            this.eventBus.emit(
                GET_AUTH_EVENT_NAME,
                connectionId,
                resolve,
                reject
            );
        });
        const res = await this.sendRequestToMessagesApi(requestBody, auth);
        await this.persistUuid(res.data.message_uuid, connectionId);
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
            throw new FailedToSendMessagesApi(
                error.response.status,
                error.response.data
            );
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

module.exports = { MessagesApiMtProcessor, HttpError, FailedToSendMessagesApi };
