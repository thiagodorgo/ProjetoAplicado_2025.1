const path = require('path');

module.exports = {
  // Rely on postcss.config.js for PostCSS/Tailwind configuration
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
