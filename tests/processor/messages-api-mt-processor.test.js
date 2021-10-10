const MessagesApiMtProcessor = require('../../src/processor/messages-api-mt-processor');
const EventEmitter = require('events');

var testBus;
var messagesApiMtProcessor;

beforeEach(() => {
    testBus = new EventEmitter();
    messagesApiMtProcessor = new MessagesApiMtProcessor(testBus);
});

const MESSAGES_SUCCESS_RESPONSE = {
    uuid: 'abc123',
};

function whenMessagesApiClientRespondsSuccessfully() {
    testBus.on(
        'send-messages-api-mt',
        async (_body, _auth, resolve, _reject) => {
            resolve({
                data: MESSAGES_SUCCESS_RESPONSE,
            });
        }
    );
}

function whenPersistingIsSuccessful() {
    testBus.on(
        'persist-uuid-connection',
        async (_uuid, _connectionId, resolve, _reject) => {
            resolve();
        }
    );
}

test('Test successful flow', async () => {
    whenMessagesApiClientRespondsSuccessfully();
    whenPersistingIsSuccessful();
    const res = await messagesApiMtProcessor.process({
        auth: 'Bearer 123',
        body: 'body',
        context: {
            connectionId: '123',
        },
    });

    expect(res).toEqual(MESSAGES_SUCCESS_RESPONSE);
});
