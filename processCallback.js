const { messagesApiCallbackProcessor } = require('./src/load-from-environment');

exports.handler = async (event) => {
    console.log(`Processing event [ ${JSON.stringify(event)} ]`);
    return messagesApiCallbackProcessor.process(event);
};
