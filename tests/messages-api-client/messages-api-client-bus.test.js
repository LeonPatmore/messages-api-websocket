const EventEmitter = require('events');
const {
    SEND_MESSAGES_API_MT_EVENT,
    MessagesApiClientBus,
} = require('../../src/messages-api-client/messages-api-client-bus');
const nock = require('nock');

const testBus = new EventEmitter();
new MessagesApiClientBus('api.nexmo.com', testBus);

const UUID = 'uuid123';
const AUTH_HEADER_VALUE = 'Bearer 123';

function whenMessagesApiRespondsWithStatusAndData(status, data) {
    nock('https://api.nexmo.com')
        .post('/v1/messages')
        .matchHeader('Authorization', AUTH_HEADER_VALUE)
        .reply(status, data);
}

test('Test a successful message', async () => {
    whenMessagesApiRespondsWithStatusAndData(200, { uuid: UUID });

    const res = await new Promise((resolve, reject) => {
        testBus.emit(
            SEND_MESSAGES_API_MT_EVENT,
            {},
            AUTH_HEADER_VALUE,
            resolve,
            reject
        );
    });
    expect(res.data.uuid).toEqual(UUID);
});

test('Test a 401 throws an error', async () => {
    whenMessagesApiRespondsWithStatusAndData(401, {});

    await expect(
        new Promise((resolve, reject) => {
            testBus.emit(
                SEND_MESSAGES_API_MT_EVENT,
                {},
                AUTH_HEADER_VALUE,
                resolve,
                reject
            );
        })
    ).rejects.toThrow('Request failed with status code 401');
});
