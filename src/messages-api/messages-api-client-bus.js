const { MessagesApiClient } = require('./messages-api-client');

const SEND_MESSAGES_API_MT_EVENT = 'send-messages-api-mt';

class MessagesApiClientBus extends MessagesApiClient {
    constructor(host, bus) {
        super(host);
        bus.on(SEND_MESSAGES_API_MT_EVENT, async (body, auth) => {
            return await this.sendV1(body, auth);
        });
    }
}

module.exports = { SEND_MESSAGES_API_MT_EVENT, MessagesApiClientBus };
