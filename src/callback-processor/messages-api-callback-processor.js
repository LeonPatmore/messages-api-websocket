const {
    GET_EVENT_NAME,
} = require('../association-persistence/association-persistence-bus');
const { SEND_CALLBACK } = require('../callback-sender/callback-sender-bus');

class MessagesApiCallbackProcessor {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    async process(request) {
        const uuid = this.getUuidFromRequest(request);
        const connectionId = await this.getConnectionId(uuid);
        console.log(`Discovered connection id [ ${connectionId} ]`);
        await new Promise((resolve, reject) => {
            this.eventBus.emit(
                SEND_CALLBACK,
                request.body,
                connectionId,
                resolve,
                reject
            );
        });
    }

    async getConnectionId(uuid) {
        return await new Promise((resolve, reject) => {
            this.eventBus.emit(GET_EVENT_NAME, uuid, resolve, reject);
        }).then((item) => {
            return item.connectionId;
        });
    }

    getUuidFromRequest(request) {
        return JSON.parse(request.body).message_uuid;
    }
}

module.exports = MessagesApiCallbackProcessor;
