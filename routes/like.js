const express = require("express");
const router = express.Router();
const Like = require("../storage/like");
const decorator = require("../pkg/routerDecorator");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const NM = 'router.like';
const likeNotFound = 'Like Not Found';

/* 
create like
body - {
    user_id: String
    blog_id: String
}
response (201): {
    ok: true
}
*/
router.post("/like", decorator(`${NM}.createLike`,
    async (req, res, next) => {
        let data = {
            ...req.body
        }

        const like = await Like.createLike(data)
        res.json({
            message: 'success',
            data: like
        })
    }
));

/* 
get likes
query- {
    offset: Number,
    limit: Number,
    sort Enum('asc', 'desc')
}
response (200): {
    
}
*/
router.get("/likes", decorator(`${NM}.getListLike`,
    async (req, res, next) => {
        let data = {
            ...req.query
        }

        const likes = await Like.getListLike(data)
        res.json({
            message: 'success',
            data: likes
        })
    }
));

/* 
delete like
param- {
   id: String
}
response (200): {
    ok: true
}
*/
router.delete("/like/:blog_id", decorator(`${NM}.deleteLike`,
    async (req, res, next) => {
        let data = {
            blog_id: req.params.blog_id
        }

        const like = await Like.deleteLike(data)
        if (!like.ok) {
            res.json({
                message: 'failed',
                data: {error: likeNotFound}
            })
            return
        }

        res.json({
            message: 'success',
            data: like
        })
    }
));


module.exports = router;