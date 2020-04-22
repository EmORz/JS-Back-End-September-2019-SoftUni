const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');


module.exports = (app) => {

    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }));
    app.set('views', path.resolve(path.dirname(__dirname), './views'));

    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({ extended: false }));

    //TODO: Setup the static files
    app.use(express.static(path.resolve(path.dirname(__dirname), './static')));
};