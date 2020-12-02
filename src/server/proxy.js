require('dotenv').config({ path: '.env.local' });

const devProxy = {
  '/api': {
    target: process.env.API_URL,
    changeOrigin: true,
  },
};

module.exports = devProxy;
