import 'module-alias/register';
import App from './app';
import DB from './db';

/**
 * Function to wrap all script that running on startup
 */

(async () => {
  const app = new App();
  app.initialize();

  await DB.initialize();
})();
