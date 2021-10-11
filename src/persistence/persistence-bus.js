const PERSIST_EVENT_NAME = 'persist';

class PersistenceBus {
    constructor(bus, persistence) {
        bus.on(
            PERSIST_EVENT_NAME,
            async (uuid, connectionId, resolve, reject) => {
                await persistence
                    .persist(uuid, connectionId)
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

module.exports = { PersistenceBus, PERSIST_EVENT_NAME };
