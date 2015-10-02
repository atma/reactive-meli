/* eslint no-console: 0, no-var: 0 */

// Register babel to have ES6 support on the server
require('babel-core/register');

// Prevent issues with libraries using this var
delete process.env.BROWSER;

require('./server')(function (app) {
  console.log('Express %s server listening on %s:%s', app.get('env'), app.get('host'), app.get('port'));

  if (app.get('env') === 'development') {
    require('./webpack/server')();
  }

});
