const withOptimizedImages = require("next-optimized-images");
const withPlugins = require("next-compose-plugins");
const path = require("path");

const imagePlugin = withOptimizedImages({
  imageTrace: {
    color: "#fff",
  },
  domains: ["seerbitimagebucket.s3.amazonaws.com"],

  webpack(config) {
    config.resolve.alias.images = path.join(__dirname, "src/images");
    return config;
  },
});

module.exports = withPlugins([imagePlugin], {
  images: {
    domains: ["seerbitimagebucket.s3.amazonaws.com"],
    hostname: ["seerbitimagebucket.s3.amazonaws.com", "ik.imagekit.io"],
  },
  Image: {
    domains: ["seerbitimagebucket.s3.amazonaws.com"],
    hostname: ["seerbitimagebucket.s3.amazonaws.com", "ik.imagekit.io"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});
