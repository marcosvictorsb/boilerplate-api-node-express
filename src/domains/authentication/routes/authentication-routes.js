const factory = require('../factories');

const controller = factory.getController();

exports.loadRoutes = function loadRoutes(server) {
  server.post('/authenticate', (...args) => controller.authenticate(...args));
};
