const express = require('express');
const routers = require('./src/config/routers');

const app = express();

routers(app);



module.exports = app;