const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Root path
router.get("/", async (req, res, next) => {
    // res.json({message: 'success'})
    res.render('index', {
        webAppTitle: 'Feedback Posting Application',
        welcomingText: 'Welcome',
    });
});

module.exports = router;