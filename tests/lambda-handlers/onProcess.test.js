const onProcess = require('../../src/lambda-handlers/onProcess');
const EventEmitter = require('events');

jest.mock('../../src/load-from-environment');
const env = require('../../src/load-from-environment');
const {
    FailedToSendMessagesApi,
} = require('../../src/mt-processor/messages-api-mt-processor.js');

test('Test on process returns data from processor', async () => {
    env.messagesApiMtProcessor.process.mockReturnValue(
        Promise.resolve({ data: 'response' })
    );

    const response = await onProcess.handler({});
    expect(response).toBe('response');
});

test('Test on process converts HTTP errors', async () => {
    env.messagesApiMtProcessor.process.mockReturnValue(
        Promise.reject(
            new FailedToSendMessagesApi(400, {
                reason: 'bad body',
            })
        )
    );

    const response = await onProcess.handler({});
    expect(response).toStrictEqual({
        httpBody: { reason: 'bad body' },
        httpStatus: 400,
        operation: 'Sending to messages api failed',
    });
});
