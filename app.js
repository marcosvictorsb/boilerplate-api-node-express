const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routers = require('./src/config/routers');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet);

routers(app);

module.exports = app;
