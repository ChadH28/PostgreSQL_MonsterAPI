const { request, response } = require('express');
const express = require('express');
const routes = require('./routes/index')
const bodyParser = require('body-parser');

const app = express();

// Ensure to put any middleware used before the routes
app.use(bodyParser.json())
app.use('/', routes)

// Error handling
app.use((error, request, response, next) => {
    response.redirect(error)
})

module.exports = app;