const path = require('path');
const fs = require('fs');

exports.loadIn = function loadIn(server) {
  const normalizedPath = path.join(__dirname);

  fs.readdirSync(normalizedPath).forEach((file) => {
    if (file !== 'index.js') {
      const route = require(`./${file}`); // eslint-disable-line global-require, import/no-dynamic-require
      if (route.loadIn) {
        route.loadIn(server);
      }
    }
  });
};
