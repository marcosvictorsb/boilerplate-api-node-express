
import 'dotenv/config'
import logger from './src/config/logger';
import app from './app';

const PORT: number | string =  process.env.PORT || 3000;


app.listen(PORT, () => {
  logger.info(`SERVER RUNNING ON PORT ${PORT}`);
});