const PERSIST_AUTH_EVENT_NAME = 'persist-auth';
const GET_AUTH_EVENT_NAME = 'get-auth';

class AuthPersistenceBus {
    constructor(bus, persistence) {
        bus.on(
            PERSIST_AUTH_EVENT_NAME,
            async (auth, connectionId, resolve, reject) => {
                await persistence
                    .persist(auth, connectionId)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        );

        bus.on(GET_AUTH_EVENT_NAME, async (connectionId, resolve, reject) => {
            await persistence
                .get(connectionId)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

module.exports = {
    AuthPersistenceBus,
    PERSIST_AUTH_EVENT_NAME,
    GET_AUTH_EVENT_NAME,
};
