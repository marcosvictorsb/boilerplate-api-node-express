const AuthenticationController = require('../controller/authentication-controller');

const getController = () => new AuthenticationController();

module.exports = { getController };
