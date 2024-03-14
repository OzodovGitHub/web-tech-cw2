const fs = require('fs');
const decorator = require('../pkg/storageDecorator');
const path = __dirname + '/../database/blogs.json';
const likeStorage = require('./like');

const NM = 'storage.blog';

module.exports = {
    createBlog: decorator(`${NM}.createBlog`, async (data) => {
        let blog = { ...data }
        let storage = JSON.parse(fs.readFileSync(path, 'utf8'))
        storage.blogs.push(blog)
        blog.id = storage.lastInsertedId
        const now = new Date()
        blog.date = `${now.getDay()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`
        storage.lastInsertedId += 1
        fs.writeFileSync(path, JSON.stringify(storage, null, 4))
        return { id: blog.id }
    }),

    updateBlog: decorator(`${NM}.updateBlog`, async (data) => {
        let storage = JSON.parse(fs.readFileSync(path, 'utf8'))
        for (let i = 0; i < storage.blogs.length; i++) {
            if (storage.blogs[i].id == data.id) {
                storage.blogs[i] = {
                    id: storage.blogs[i].id,
                    date: storage.blogs[i].date,
                    ...data
                }
                fs.writeFileSync(path, JSON.stringify(storage, null, 4))
                return { ok: true }
            }
        }

        return { ok: false }
    }),

    getSingleBlog: decorator(`${NM}.getSingleBlog`, async (data) => {
        let storage = JSON.parse(fs.readFileSync(path, 'utf8'))
        let blog = storage.blogs.filter(blog => blog.id == data.id)
        if (blog.length > 0) {
            let likes = (await likeStorage.getListLike()).likes
            const id = blog[0].id.toString()
            blog[0].likes = likes[id] 
        }
        return blog.length > 0 ? blog[0] : {}

    }),

    getListBlog: decorator(`${NM}.getListBlog`, async (data) => {
        let storage = JSON.parse(fs.readFileSync(path, 'utf8'))
        let likes = (await likeStorage.getListLike()).likes

        for (let i=0; i<storage.blogs.length; i++) {
            const id = storage.blogs[i].id.toString()
            storage.blogs[i].likes = likes[id] ? likes[id] : 0
        }

        return { blogs: storage.blogs.reverse(), count: storage.blogs.length }
    }),

    deleteBlog: decorator(`${NM}.deleteBlog`, async (data) => {
        let storage = JSON.parse(fs.readFileSync(path, 'utf8'))
        for (let i = 0; i < storage.blogs.length; i++) {
            if (storage.blogs[i].id == data.id) {
                storage.blogs.splice(i, 1)
                fs.writeFileSync(path, JSON.stringify(storage, null, 4))
                return { ok: true }
            }
        }

        return { ok: false }
    }),
};