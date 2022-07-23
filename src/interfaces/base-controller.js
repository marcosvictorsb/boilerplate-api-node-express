const logger = require('../config/logger');

class Controller {
  constructor() {
    this.errorHandler = (error = {}, request, response) => {
      logger.error(error);
      response.status(error.status || 400).json(error);
    };
  }
}

module.exports = Controller;
