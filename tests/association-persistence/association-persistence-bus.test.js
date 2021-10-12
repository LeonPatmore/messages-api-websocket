const EventEmitter = require('events');
const { connect } = require('net');
const {
    GET_EVENT_NAME,
    AssociationPersistenceBus,
    PERSIST_EVENT_NAME,
} = require('../../src/association-persistence/association-persistence-bus');

const testBus = new EventEmitter();
const ASSOCIATION_UUID = 'some-uuid';
const TEST_ASSOCIATION = {
    uuid: ASSOCIATION_UUID,
    connectionId: 'some-connection-id',
};

const mockPersist = jest.fn();
mockPersist.mockResolvedValue(TEST_ASSOCIATION);

const testPersistence = {
    get: async (_uuid) => {
        return TEST_ASSOCIATION;
    },
    persist: mockPersist,
};

new AssociationPersistenceBus(testBus, testPersistence);

test('Test getting an association works', async () => {
    const association = await new Promise((resolve, reject) => {
        testBus.emit(GET_EVENT_NAME, ASSOCIATION_UUID, resolve, reject);
    });

    expect(association).toEqual(TEST_ASSOCIATION);
});

test('Test persisting an association works', async () => {
    const connectionId = 'some-connection-id';
    await new Promise((resolve, reject) => {
        testBus.emit(
            PERSIST_EVENT_NAME,
            ASSOCIATION_UUID,
            connectionId,
            resolve,
            reject
        );
    });

    expect(mockPersist).toHaveBeenCalledWith(ASSOCIATION_UUID, connectionId);
});
