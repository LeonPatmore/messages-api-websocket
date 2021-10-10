/**
 * Used for testing integration with the real messages api. Disabled by default.
 */

const {
    MessagesApiClient,
} = require('../../src/messages-api-client/messages-api-client');

const AUTH = '';
const TO_NUMBER = '';

test('Test request to the messages api', async () => {
    const client = new MessagesApiClient('api.nexmo.com');
    const id = await client.sendV1(
        {
            channel: 'sms',
            from: 'HELLO',
            to: TO_NUMBER,
            message_type: 'text',
            text: 'Hello there!',
        },
        AUTH
    );
    expect(id).toEqual(expect.any(String));
});
