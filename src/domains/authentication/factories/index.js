const AuthenticationController = require('../controller/authentication-controller');
const AuthenticationValidator = require('../validator/authentication-validator');
const AuthenticationService = require('../service/authentication-service');
const { schema } = require('../validator/authentication-schema');

const getController = (params = {}) => new AuthenticationController({
  serviceAuth: params.serviceAuth || new AuthenticationService(),
  validator: params.validator || new AuthenticationValidator({ schema }),
});

module.exports = { getController };
