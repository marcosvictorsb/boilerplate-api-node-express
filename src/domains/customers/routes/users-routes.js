const { getController } = require('../factories')

const controller = getController();

exports.loadRoutes = loadRoutes = (server) => {
  server.post('/users', (...args) => controller.create(...args))
};
