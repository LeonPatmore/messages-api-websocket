const { messagesApiMtProcessor } = require('../load-from-environment');
const {
    FailedToSendMessagesApi,
} = require('../mt-processor/messages-api-mt-processor');

exports.handler = async (event) => {
    console.log(`Processing event [ ${JSON.stringify(event)} ]`);
    try {
        return messagesApiMtProcessor.process(event).then((res) => {
            return Promise.resolve({
                httpStatus: res.status,
                httpBody: res.data,
            });
        });
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
