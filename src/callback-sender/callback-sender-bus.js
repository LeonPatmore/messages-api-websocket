const SEND_CALLBACK = 'send-callback';

class CallbackSenderBus {
    constructor(bus, callbackSender) {
        bus.on(
            SEND_CALLBACK,
            async (callback, connectionId, resolve, reject) => {
                await callbackSender
                    .send(callback, connectionId)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        );
    }
}

module.exports = { CallbackSenderBus, SEND_CALLBACK };
