const messagesApiMtProcessor = require('./load-from-environment');

exports.handler = async (event) => {
    console.log(`Processing event [ ${JSON.stringify(event)} ]`);
    const responseBody = await messagesApiMtProcessor.process(event.body);

    return {
        statusCode: 200,
        body: responseBody,
    };
};
