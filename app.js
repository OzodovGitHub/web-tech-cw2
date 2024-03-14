require("dotenv").config({ path: "./.env" })
const express = require("express");
const app = express();
const morgan = require('morgan');
const pug = require('pug');
const config = require('./config/config');
const path = require('path');
var multer = require('multer');
var upload = multer();

const indexRouter = require("./routes/index");
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const likeRouter = require('./routes/like');

app.use(morgan('tiny'));
app.set('views', path.join(__dirname, 'views'));
// serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.use(express.urlencoded({
    extended: true
}));

// for parsing multipart/form-data
app.use(upload.array()); 

app.use(indexRouter);
app.use(userRouter);
app.use(blogRouter);
app.use(likeRouter);


(async () => {
    // Start server
    app.listen(config.httpPort, () => {
        console.log(`Server running at http://localhost:${config.httpPort}`)
    });
})();
