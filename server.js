require('dotenv').config();
const logger = require('./src/config/logger');

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info(`SERVER RUNNING IN ${PORT}`));
