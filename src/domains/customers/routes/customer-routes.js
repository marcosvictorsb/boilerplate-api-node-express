const { getController } = require('../factories');
const { authMiddleware } = require('../../../middlewares/auth');

const controller = getController();

exports.loadRoutes = function loadRoutes(server) {
  server.post('/customer/', (...args) => controller.create(...args));
  server.get('/customer/', authMiddleware, (...args) => controller.getAllCustomers(...args));
  server.get('/customer/email', authMiddleware, (...args) => controller.getByEmail(...args));
  server.get('/customer/forget-password', (...args) => controller.forgetPassword(...args));
};
