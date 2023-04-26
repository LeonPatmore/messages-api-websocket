const { messagesApiMtProcessor } = require('../load-from-environment');
const { HttpError } = require('../mt-processor/messages-api-mt-processor');

exports.handler = async (event) => {
    console.log(`Processing event [ ${JSON.stringify(event)} ]`);
    return messagesApiMtProcessor
        .process(event)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return handleError(err);
        });
};

function handleError(error) {
    if (error instanceof HttpError) {
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
