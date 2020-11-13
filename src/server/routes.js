const routes = require('next-routes')();

routes
  .add('/', '/home/index')
  .add('/signin', '/auth/signin')
  .add('/signup', '/auth/signup')
  .add('/forgot', '/auth/forgot');

module.exports = routes;
