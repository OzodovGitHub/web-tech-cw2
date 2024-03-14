const express = require("express");
const router = express.Router();
const Blog = require("../storage/blog");
const decorator = require("../pkg/routerDecorator");
const bodyParser = require("body-parser");
const util = require("../pkg/util");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const NM = 'router.blog';
const blogNotFound = 'Blog Not Found';

router.get("/blog/new", decorator(`${NM}.createBlogModel`,
    async (req, res, next) => {
        res.render('blog_create', {

        })
    }
));
router.post("/blog/new", decorator(`${NM}.createBlog`,
    async (req, res, next) => {
        let data = {
            ...req.body
        }

        if (!util.validate(data.author)) {
            res.status(401).json({
                message: 'failed',
                data: {}
            })
            return
        }
        if (!util.validate(data.title)) {
            res.status(401).json({
                message: 'failed',
                data: {}
            })
            return
        }
        if (!util.validate(data.body)) {
            res.status(401).json({
                message: 'failed',
                data: {}
            })
            return
        }

        const blog = await Blog.createBlog(data)
        res.json({
            message: 'success',
            data: blog
        })
    }
));

router.get("/blog/:id/edit", decorator(`${NM}.updateBlogModal`,
    async (req, res, next) => {
        
        res.render('blog_edit', {

        })
    }
));
router.post("/blog/:id/edit", decorator(`${NM}.updateBlog`,
    async (req, res, next) => {
        
        let data = {
            ...req.body,
            id: req.params.id
        }

        if (!util.validate(data.author)) {
            res.status(401).json({
                message: 'failed',
                data: {}
            })
            return
        }
        if (!util.validate(data.title)) {
            res.status(401).json({
                message: 'failed',
                data: {}
            })
            return
        }
        if (!util.validate(data.body)) {
            res.status(401).json({
                message: 'failed',
                data: {}
            })
            return
        }

        const blog = await Blog.updateBlog(data)
        
        if (!blog.ok) {
            res.json({
                message: 'failed',
                data: {error: blogNotFound}
            })
            return
        }
        res.redirect('/')
    }
));
router.get("/blog/:id", decorator(`${NM}.getSingleBlog`,
    async (req, res, next) => {
        let data = {
            id: req.params.id
        }

        const blog = await Blog.getSingleBlog(data)
        if (!blog) {
            res.json({
                message: 'failed',
                data: {error: blogNotFound}
            })
            return
        }
        res.render('blog_view', {
            blog: blog
        })
    }
));
router.get("/blog", decorator(`${NM}.getListBlog`,
    async (req, res, next) => {
        let data = {
            ...req.query
        }

        const blogs = await Blog.getListBlog(data)
        
        res.render('all_blogs', {
            blogs: blogs.blogs
        })
    }
));
router.get("/blog/:id/delete", decorator(`${NM}.deleteBlog`,
    async (req, res, next) => {
        let data = {
            id: req.params.id
        }

        const blog = await Blog.deleteBlog(data)
        if (!blog.ok) {
            res.json({
                message: 'failed',
                data: {error: blogNotFound}
            })
            return
        }

        res.redirect('/blog')
    }
));
module.exports = router;