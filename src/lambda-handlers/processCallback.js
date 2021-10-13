const { messagesApiCallbackProcessor } = require('../load-from-environment');

exports.handler = async (event) => {
    console.log(`Processing event [ ${JSON.stringify(event)} ]`);
    await messagesApiCallbackProcessor.process(event);
    return {
        statusCode: 200,
        body: 'Success!',
    };
};
