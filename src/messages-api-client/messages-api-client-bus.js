const { MessagesApiClient } = require('./messages-api-client');

const SEND_MESSAGES_API_MT_EVENT = 'send-messages-api-mt';

class MessagesApiClientBus extends MessagesApiClient {
    constructor(host, bus) {
        super(host);
        bus.on(
            SEND_MESSAGES_API_MT_EVENT,
            async (body, auth, resolve, reject) => {
                await this.sendV1(body, auth)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        );
    }
}

module.exports = { SEND_MESSAGES_API_MT_EVENT, MessagesApiClientBus };
