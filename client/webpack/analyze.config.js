const produce = require('immer').produce;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = require('./prod.config');

module.exports = produce(prodConfig, draft => {
  draft.plugins.push(new BundleAnalyzerPlugin());
});
