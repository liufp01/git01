/*
 * @Author: your name
 * @Date: 2020-03-18 10:27:57
 * @LastEditTime: 2020-03-23 11:23:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /产品定价2020_git/build/webpack.base.conf.js
 */
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const FileManagerPlugin = require('filemanager-webpack-plugin');//自动打包插件
const fsFile = require('./fs-file');//读写文件
const process = require('process');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const multiConfig = require('../config/multi.conf')
let PACKAGE_CONFIG = ()=>{
  // const ENV_SCRIPT = process.env.npm_package_scripts_start;
  const ENV_SCRIPT = process.env.NODE_ENV
  if(ENV_SCRIPT==='production'){  //产出
    return [
      new FileManagerPlugin({
        // onStart:[
        //   {
        //     delete: [
        //       'offline-package/'+multiConfig.process.name,
        //      ],
        //     mkdir:[
        //       'offline-package/'+multiConfig.process.name+'/Web',
        //     ],
            
        //   },
        //   // {
        //   //   copy:[
        //   //     {source: './package-resouce/'+multiConfig.process.name+'/AppInfo.txt', destination: './offline-package/'+multiConfig.process.name+'/AppInfo.txt'},
        //   //     {source: './package-resouce/'+multiConfig.process.name+'/Web/IconYystoreLarge.png', destination: './offline-package/'+multiConfig.process.name+'/Web/IconYystoreLarge.png'},
        //   //     {source: './package-resouce/'+multiConfig.process.name+'/Web/IconYystoreSmall.png', destination: './offline-package/'+multiConfig.process.name+'/Web/IconYystoreSmall.png'},
        //   //     {source: './package-resouce/'+multiConfig.process.name+'/Web/WebInfo.txt', destination: './offline-package/'+multiConfig.process.name+'/Web/WebInfo.txt'},
        //   //     {source: './package-resouce/'+multiConfig.process.name+'/Web/WebIntroduction.txt', destination: './offline-package/'+multiConfig.process.name+'/Web/WebIntroduction.txt'},
        //   //     {source: './package-resouce/'+multiConfig.process.name+'/Web/WebUpdateLog.txt', destination: './offline-package/'+multiConfig.process.name+'/Web/WebUpdateLog.txt'},
        //   //   ],
        //   // }
        //   ],
        //   onEnd:[
        //     {
        //       copy:[
        //         { source: './dist/'+multiConfig.process.name, destination: 'offline-package/'+multiConfig.process.name+'/Web/www/www' },
        //       ],
        //       archive:[
        //         {source: 'offline-package/'+multiConfig.process.name+'/Web/www',
        //          destination: './offline-package/'+multiConfig.process.name+'/Web/www.zip'},
        //       ],
        //     },
        //     {
        //       copy:[
        //         {source: 'offline-package/'+multiConfig.process.name+'/Web/www.zip',
        //         destination: './offline-package/'+multiConfig.process.name+'/Web/summer.zip'}
        //       ]
        //     },
        //     {
        //       // rename:[
        //       //   {source: 'package-resouce/'+multiConfig.process.name+'/Web/WebInfo.txt',
        //       //   destination: 'offline-package/'+multiConfig.process.name+'/Web/WebInfo.txt'},
        //       // ],
        //       // archive:[
        //       //   {source: 'offline-package/'+multiConfig.process.name,
        //       //    destination: './offline-package/'+multiConfig.process.name+'.zip'},
        //       // ],
        //     },
        //     {
        //       delete:[
        //         'offline-package/'+multiConfig.process.name+'/Web/www',
        //         'offline-package/'+multiConfig.process.name+'/Web/www.zip'
        //       ]
        //     },
        //     { 
        //       archive:[
        //       {source: 'offline-package/'+multiConfig.process.name,
        //        destination: './offline-package/'+multiConfig.process.name+'.zip'},
        //     ],
        //   }
        //   ]
  
    }),
      new fsFile({
        source:'package-resouce/'+multiConfig.process.name+'/Web/WebInfo.txt',
        destination:'package-resouce/'+multiConfig.process.name+'/Web/WebInfo.txt',
        package:multiConfig.process.name
      })
    ]
  }else{
    return [];
  }
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: multiConfig.process.entry,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@comm': resolve(`src/comm`),
      '@src':resolve(`src`),
      '@': multiConfig.process.alias,
      ...multiConfig.moduleAlias
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass","scss"]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins:PACKAGE_CONFIG()
}
