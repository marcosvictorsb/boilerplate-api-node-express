require('dotenv').config();
const os = require('os');
const logger = require('./src/config/logger');

const app = require('./app');

const PORT = process.env.PORT || 3000;

const currentDateTime = new Date().toLocaleString();
const networkInterfaces = os.networkInterfaces();

const response = {
  currentDateTime,
  message: 'server online',
  networkInterfaces,
};

logger.info(response);

app.listen(PORT, () => logger.info(`SERVER RUNNING IN ${PORT}`));
