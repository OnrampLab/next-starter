require('dotenv').config();

const devProxy = {
  '/api': {
    target: process.env.API_URL,
    pathRewrite: { '^/api': '' },
    changeOrigin: true,
  },
};

module.exports = devProxy;
