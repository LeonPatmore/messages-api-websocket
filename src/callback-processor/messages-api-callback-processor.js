class MessagesApiCallbackProcessor {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    async process(request) {}

    getUuidFromRequest(request) {
        return request.uuid;
    }
}
