const decorator = require('../pkg/storageDecorator');

const storage  = new Map();
const NM = 'storage.user';

module.exports = {
    createUser: decorator(`${NM}.createUser`, async (data) => {
        let user = {...data}
        user.id = v4();
        storage.set(user.id, user);

        return { id: user.id }
    }),

    updateUser: decorator(`${NM}.updateUser`, async (data) => {
        if (!storage.get(data.id)) {
            throw new Error("user not found")
        }

        let user = {...data}
        storage.set(data.id, user)
        return { ok: true }
    }),

    getSingleUser: decorator(`${NM}.getSingleUser`, async (data) => {
        if (!storage.get(data.id)) {
            throw new Error("user not found")
        }

        return storage.get(data.id)
    }),

    getListUser: decorator(`${NM}.getListUser`, async (data) => {
        return { users: Object.fromEntries(storage), count: storage.size }
    }),
    
    deleteUser: decorator(`${NM}.deleteUser`, async (data) => {
        if (!storage.get(data.id)) {
            throw new Error("user not found")
        }

        const ok = storage.delete(data.id)
        return { ok: ok }
    }),
};