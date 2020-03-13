require('dotenv').config();

module.exports = {
  apps: [
    {
      name: process.env.APPLICATION,
      script: './src/server/index.js',
      cwd: `${process.env.DEPLOY_TO}/current`,
      error_file: './logs/pm2.app.log',
      out_file: './logs/pm2.app.log',
      exec_mode: 'cluster',
      instances: '1',
      wait_ready: true,
      listen_timeout: 30000,
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  ],
};
