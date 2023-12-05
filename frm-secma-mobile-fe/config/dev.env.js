/*
 * @Author: your name
 * @Date: 2020-03-18 10:27:57
 * @LastEditTime: 2020-03-26 13:38:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /产品定价2020_git/config/dev.env.js
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   API_PATH:'""',
//   BRANCH_ENV: JSON.stringify(process.env.BRANCH_ENV) || '"base"',
//   ignoreCsrfToken:'"false"',
//   // 开发环境请求地址⬇
//   API_ROOT: ' "http://125.35.5.229:80/umserver/core" ' 
// })
module.exports = {
  NODE_ENV: '"development"',
  API_PATH:'""',
  BRANCH_ENV: JSON.stringify(process.env.BRANCH_ENV) || '"base"',
  ignoreCsrfToken:'"false"',
  // 生产环境请求地址⬇
  API_ROOT: ' "/api" '
}