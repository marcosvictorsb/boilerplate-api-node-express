const Router = require('express')
const { getController } = require('../factories')

// const routes = Router()
const controller = getController();

exports.loadRoutes = loadRoutes = (server) => {
  server.post('/users', (...args) => controller.create(...args))
};
