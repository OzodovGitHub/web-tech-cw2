const decorator = require('../pkg/storageDecorator');
const path = __dirname + '/../database/likes.json';
const fs = require('fs');

const NM = 'storage.like';

module.exports = {
    createLike: decorator(`${NM}.createLike`, async (data) => {
        let storage = JSON.parse(fs.readFileSync(path, 'utf8'))
        const id = data.blog_id.toString()
        if (!storage.hasOwnProperty(id)) {
            storage[id] = 1
        }

        storage[id] += 1
        fs.writeFileSync(path, JSON.stringify(storage, null, 4))

        return { ok: true }
    }),

    getListLike: decorator(`${NM}.getListLike`, async (data) => {
        let storage = JSON.parse(fs.readFileSync(path, 'utf8'))
        return { likes: storage, count: storage.size }
    }),

    deleteLike: decorator(`${NM}.deleteLike`, async (data) => {
        let storage = JSON.parse(fs.readFileSync(path, 'utf8'))
        const id = data.blog_id.toString()

        if (!storage.hasOwnProperty(id)) {
            return { ok: false }
        }

        storage[id] > 0 ?
            storage[id] -= 1 :
            null

        fs.writeFileSync(path, JSON.stringify(storage, null, 4))

        return { ok: ok }
    }),
};