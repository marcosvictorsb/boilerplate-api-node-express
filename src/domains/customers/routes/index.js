const path = require('path');
const fs = require('fs');

const routes = require('./users-routes');

exports.loadIn = function loadIn(server) {
  const normalizedPath = path.join(__dirname);

  fs.readdirSync(normalizedPath).forEach((file) => {
    if (file !== 'index.js') {
      require(`./${file}`).loadRoutes(server);
    }
  });
};
