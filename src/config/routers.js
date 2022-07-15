const path = require('path');
const fs = require('fs');


const routers = (server) => {
  const normalizedPath = path.join(__dirname, '../domains');
  fs.readdirSync(normalizedPath).forEach((file) => {
    if(file !== 'index.js'){
      require(`../domains/${file}`).loadIn(server);
    }
  })
}


module.exports = routers;
