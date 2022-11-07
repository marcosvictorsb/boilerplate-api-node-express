const express = require('express');
// const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('./cors');
const routers = require('./src/config/routers');

const app = express();

app.options('*', cors);
app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(helmet);
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       'script-src': ["'self'", 'example.com'],
//       'style-src': null,
//     },
//   }),
// );
routers(app);

module.exports = app;
