const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./src/config/routers');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routers(app);

module.exports = app;
