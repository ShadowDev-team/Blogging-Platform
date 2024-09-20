const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path'); 
var bodyParser = require('body-parser');
const authMiddleware = require('./middleware/authMiddleware');


require("dotenv").config();
require("./config/database");


const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');
// const commentRoutes = require('./routes/commentRoutes');


const app = express();
app.set('view engine', 'ejs');


// middlewares
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(expressLayouts);
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(authMiddleware);
app.use("/api", apiRoutes);
app.use("/", webRoutes);
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// app.use('/api', commentRoutes);




module.exports = app;