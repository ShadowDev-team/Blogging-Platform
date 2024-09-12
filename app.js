const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
require("./config/database");

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');


const app = express();
app.set('view engine', 'ejs');

// middlewares
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(express.json());
app.use(expressLayouts);
app.use(express.static('public'));
app.use("/api", apiRoutes);
app.use("/", webRoutes);


module.exports = app;