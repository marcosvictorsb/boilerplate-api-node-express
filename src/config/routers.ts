import path from 'path';
import fs from 'fs';
import { Express } from 'express';


const routers = (server: Express): void => {
  const normalizedPath = path.join(__dirname, '../domains');

  fs.readdirSync(normalizedPath).forEach((file) => {
    if (file !== 'index.ts') {
      const routeModule = require(`../domains/${file}`);
      if (routeModule && typeof routeModule.loadIn === 'function') {
        routeModule.loadIn(server);
      }
    }
  });
};

export default routers;

