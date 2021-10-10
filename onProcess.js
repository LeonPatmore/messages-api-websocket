const messagesApiMtProcessor = require('./src/load-from-environment');
const {
    FailedToSendMessagesApi,
} = require('./src/processor/messages-api-mt-processor');

exports.handler = async (event) => {
    console.log(`Processing event [ ${JSON.stringify(event)} ]`);
    try {
        const res = await messagesApiMtProcessor.process(event);
        return {
            httpStatus: res.status,
            httpBody: res.data,
        };
    } catch (error) {
        return handleError(error);
    }
};

function handleError(error) {
    if (error instanceof FailedToSendMessagesApi) {
        return {
            operation: 'Sending to messages api failed',
            httpStatus: error.status,
            httpBody: error.body,
        };
    } else {
        return {
            operation: 'unknown',
            reason: error.message,
        };
    }
}
