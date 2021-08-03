// const withSass = require('@zeit/next-sass');
const withOptimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');
const path = require('path');
// const withCSS = require('@zeit/next-css');

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
  // withSass,
  // withCSS,
  // // {
  // //   useFileSystemPublicRoutes: process.env.NODE_ENV !== 'production',
  // // },
],
{
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
);

// module.exports = {
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
// }
