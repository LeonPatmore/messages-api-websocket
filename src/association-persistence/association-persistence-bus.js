const PERSIST_EVENT_NAME = 'persist-association';
const GET_EVENT_NAME = 'get-association';

class AssociationPersistenceBus {
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

        bus.on(GET_EVENT_NAME, async (uuid, resolve, reject) => {
            await persistence
                .get(uuid)
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
    AssociationPersistenceBus,
    PERSIST_EVENT_NAME,
    GET_EVENT_NAME,
};
