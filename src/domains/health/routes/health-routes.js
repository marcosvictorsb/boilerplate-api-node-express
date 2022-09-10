const { getController } = require('../factories');

const controller = getController();

exports.loadRoutes = function loadRoutes(server) {
  server.get('/health', (...args) => controller.health(...args));
};
