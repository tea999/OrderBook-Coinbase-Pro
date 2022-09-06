/** @type {import('jest').Config} */
const config = {
  verbose: true,
  "transformIgnorePatterns": [
    'node_modules/(?!d3-shape)'
  ]
  };
  
  module.exports = config;