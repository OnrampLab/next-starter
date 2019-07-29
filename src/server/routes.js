const routes = require('next-routes')();

routes
  .add('/', '/home/index')
  .add('/signin', '/auth/signin')
  .add('/signup', '/auth/signup')

module.exports = routes;
