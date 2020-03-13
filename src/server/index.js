/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const path = require('path');
const devProxy = require('./proxy');
const { parse } = require('url');

const PORT = process.env.PORT || 3000;

const app = next({
  dev: process.env.NODE_ENV !== 'production',
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);
const fakeUser = {
  id: 1,
  email: 'admin@test.com',
  password: 'test',
  token: 'fake_token',
};

app.prepare().then(() => {
  const server = express();

  app.setAssetPrefix(process.env.STATIC_PATH);

  server.use(express.static(path.join(__dirname, '../../public')));
  server.use(bodyParser());

  if (process.env.PROXY_MODE === 'local') {
    const proxyMiddleware = require('http-proxy-middleware');
    Object.keys(devProxy).forEach(function(context) {
      server.use(proxyMiddleware(context, devProxy[context]));
    });
  }

  server.post('/onr-login', (req, res) => {
    const { email, password } = req.body || {};

    if (email === fakeUser.email && password === fakeUser.password) {
      res.json({
        id: fakeUser.id,
        token: fakeUser.token,
      });
    } else {
      res.status(409).json({
        message: 'Wrong email or password',
      });
    }
  });

  server.use(function(req, res) {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/sw.js' || pathname.startsWith('/workbox-')) {
      const filePath = path.join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handler(req, res, parsedUrl);
    }
  });

  server.get('*', async (req, res) => {
    return handler(req, res);
  });

  const instance = server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);

    // NOTE: we enabled the cluster mode of pm2.
    //       http://pm2.keymetrics.io/docs/usage/cluster-mode/#cluster-mode
    //       it required slave processes to notify master process if it's ready to accept requests.
    if (process.send) {
      console.log(`process(${process.pid}) is ready`);
      process.send('ready');
    }
  });

  const shutdown = async () => {
    console.log('server is closing now');

    instance.close(error => {
      if (error) {
        console.error('server closed with error', error);
        process.exit(1);
      }

      console.log('server closed');
      process.exit(0);
    });
  };

  process.on('SIGINT', async () => {
    console.error(`SIGINT ${process.pid}`);
    shutdown();
  });
});

/* eslint-enable @typescript-eslint/no-var-requires */
