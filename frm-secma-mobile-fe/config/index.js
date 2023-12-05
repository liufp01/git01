/*
 * @Author: your name
 * @Date: 2020-03-18 10:27:57
 * @LastEditTime: 2020-04-08 10:05:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edi
 * @FilePath: /产品定价2020_git/config/index.js
 */
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const multiConfig = require('../config/multi.conf')
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
         target: 'http://10.29.195.199',
        // target: 'http://10.29.138.98:80',
        // target: 'http://10.29.140.17',
        changeOrigin: true,
        pathRewrite: {
          '^/api' :''
        },
        // secure: true,
        headers: {
          host: 'http://10.29.195.199',
          origin: 'http://10.29.195.199'
          // host: 'http://10.29.138.98:80',
          // origin: 'http://10.29.138.98:80'
          // host: 'http://10.29.140.17',
          // origin: 'http://10.29.140.17'
        },
        onProxyReq: function (proxyReq, req, res, options) {
          if (req.body) {
            let bodyData = JSON.stringify(req.body);
            // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            // stream the content
            proxyReq.write(bodyData);
          }
        }
      },
    },
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8089, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: multiConfig.process.index,

    // Paths
    assetsRoot: multiConfig.process.assetsRoot,
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
