import path from 'path';
import fs from 'fs';
import { Express } from 'express';


export function loadIndex(server: Express): void {
  const normalizedPath = path.join(__dirname);

  fs.readdirSync(normalizedPath).forEach((file) => {
    if (file !== 'index.ts') { 
      const modulePath = `./${file}`;
      import(modulePath).then(routeModule => {
        if (routeModule && typeof routeModule.loadRoutes === 'function') {
          routeModule.loadRoutes(server);
        }
      }).catch(error => {
        console.error(`Failed to load module ${modulePath}:`, error);
      });
    }
  });
}
