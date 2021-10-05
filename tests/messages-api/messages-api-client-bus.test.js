const EventEmitter = require('events');
const {
    SEND_MESSAGES_API_MT_EVENT,
    MessagesApiClientBus,
} = require('../../src/messages-api/messages-api-client-bus');

const testBus = new EventEmitter();
const client = new MessagesApiClientBus('api.nexmo.com', testBus);

test('Test a successful message', async () => {
    const res = await new Promise((resolve, reject) => {
        testBus.emit(
            SEND_MESSAGES_API_MT_EVENT,
            {},
            'Basic 123',
            resolve,
            reject
        );
    });

    console.log(res);
});
