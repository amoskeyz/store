const withSass = require('@zeit/next-sass');
const withOptimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');
const path = require('path');

const imagePlugin = withOptimizedImages({
  imageTrace: {
    color: '#fff',
  },

  webpack(config) {
    config.resolve.alias.images = path.join(__dirname, 'src/images');
    return config;
  },
});



module.exports = withPlugins([
  imagePlugin,
]);
