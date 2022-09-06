/** @type {import('jest').Config} */
const config = {
  verbose: true,
  "transformIgnorePatterns": [
    'node_modules/(?!d3-shape)'
    // "/node_modules/(?!d3-shape/src/index.js)/"
  ]
  };
  
  module.exports = config;