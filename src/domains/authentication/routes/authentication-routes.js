const factory = require('../factories');

const controller = factory.getController();

exports.loadRoutes = function loadRoutes(server) {
  server.post('/authenticate', (...args) => controller.authenticate(...args));
  server.post('/register', (...args) => controller.register(...args));
};
