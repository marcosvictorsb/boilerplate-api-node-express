const { getController } = require('../factories');

const controller = getController();

exports.loadRoutes = function loadRoutes(server) {
  server.post('/users', (...args) => controller.create(...args));
  server.get('/users', (...args) => controller.getByEmail(...args));
};
