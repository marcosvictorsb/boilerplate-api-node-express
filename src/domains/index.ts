const path = require('path');
const fs = require('fs');
import { Express } from 'express';
exports.loadIn = function loadIn(server: Express) {
  const normalizedPath = path.join(__dirname);

  fs.readdirSync(normalizedPath).forEach((file: any) => {
    if (file !== 'index.js') {
      const route = require(`./${file}`); // eslint-disable-line global-require, import/no-dynamic-require
      if (route.loadIn) {
        route.loadIn(server);
      }
    }
  });
};
