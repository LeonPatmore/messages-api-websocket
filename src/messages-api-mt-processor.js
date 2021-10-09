const {
    SEND_MESSAGES_API_MT_EVENT,
} = require('./messages-api-client/messages-api-client-bus');

class MessagesApiMtProcessor {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    async startProcessing(request) {
        eventBus.emit(SEND_MESSAGES_API_MT_EVENT);
    }

    async persist() {
        // Now we want to persist uuid and connection id
    }

    async return() {
        // Now return the sync response.
    }
}

module.exports = MessagesApiMtProcessor;
