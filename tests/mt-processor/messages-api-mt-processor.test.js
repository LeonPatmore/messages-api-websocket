const {
    GET_AUTH_EVENT_NAME,
} = require('../../src/auth-persistence/auth-persistence-bus');
const {
    MessagesApiMtProcessor,
} = require('../../src/mt-processor/messages-api-mt-processor');
const EventEmitter = require('events');

const MESSAGES_SUCCESS_RESPONSE = {
    uuid: 'abc123',
};
const MESSAGES_SUCCESS_STATUS_CODE = 202;
const INBOUND_URL = 'test_url';
const bodyMock = jest.fn();
const authMock = jest.fn();

var testBus;
var messagesApiMtProcessor;

beforeEach(() => {
    testBus = new EventEmitter();
    messagesApiMtProcessor = new MessagesApiMtProcessor(testBus, INBOUND_URL);
});

function whenMessagesApiClientRespondsSuccessfully() {
    testBus.on(
        'send-messages-api-mt',
        async (_body, _auth, resolve, _reject) => {
            bodyMock(_body);
            authMock(_auth);
            resolve({
                data: MESSAGES_SUCCESS_RESPONSE,
                status: MESSAGES_SUCCESS_STATUS_CODE,
            });
        }
    );
}

function whenPersistingIsSuccessful() {
    testBus.on(
        'persist-association',
        async (_uuid, _connectionId, resolve, _reject) => {
            resolve();
        }
    );
}

function whenAuthIsPersisted() {
    testBus.on(GET_AUTH_EVENT_NAME, async (uuid, resolve, reject) => {
        resolve('someAuth');
    });
}

test('Test successful flow', async () => {
    whenMessagesApiClientRespondsSuccessfully();
    whenPersistingIsSuccessful();
    whenAuthIsPersisted();
    const res = await messagesApiMtProcessor.process({
        input: {
            auth: 'Bearer 123',
            body: 'body',
        },
        context: {
            connectionId: '123',
        },
    });

    expect(res.data).toEqual(MESSAGES_SUCCESS_RESPONSE);
    expect(res.status).toEqual(MESSAGES_SUCCESS_STATUS_CODE);
});

test('Test processor injects webhook version and url', async () => {
    whenMessagesApiClientRespondsSuccessfully();
    whenPersistingIsSuccessful();
    whenAuthIsPersisted();
    await messagesApiMtProcessor.process({
        input: {
            hi: 'bye',
        },
        context: {
            connectionId: '123',
        },
    });

    expect(bodyMock).toBeCalledWith({
        hi: 'bye',
        webhook_version: 'v1',
        webhook_url: INBOUND_URL,
    });
});

test('Test processor sends auth from persisted value', async () => {
    whenMessagesApiClientRespondsSuccessfully();
    whenPersistingIsSuccessful();
    whenAuthIsPersisted();
    await messagesApiMtProcessor.process({
        input: {
            hi: 'bye',
        },
        context: {
            connectionId: '123',
        },
    });

    expect(authMock).toBeCalledWith('someAuth');
});
