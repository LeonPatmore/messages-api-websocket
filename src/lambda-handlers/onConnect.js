const {
    PERSIST_AUTH_EVENT_NAME,
} = require('../auth-persistence/auth-persistence-bus');
const { eventBus } = require('../load-from-environment');

exports.handler = async (event) => {
    console.log(`Processing on connect event [ ${JSON.stringify(event)} ]`);
    return await new Promise((resolve, reject) => {
        eventBus.emit(
            PERSIST_AUTH_EVENT_NAME,
            event.headers.Authorization,
            event.context.connectionId,
            resolve,
            reject
        );
    }).then(() => {
        return { statusCode: 200, body: 'Connected.' };
    });
};
