/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');

const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const nextRuntimeDotenv = require('next-runtime-dotenv');
/* eslint-enable @typescript-eslint/no-var-requires */

const withConfig = nextRuntimeDotenv({
  public: ['API_URL', 'API_KEY'],
});

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}

const nextConfig = {
  env: {
    weatherApi: '',
    mapBoxApi: '',
  },
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60,
    pagesBufferLength: 5,
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  }
};

module.exports = withConfig(withPlugins(
  [
    [withCSS],
    [withSass],
    [withLess],
    [withBundleAnalyzer]
  ],
  nextConfig,
));
