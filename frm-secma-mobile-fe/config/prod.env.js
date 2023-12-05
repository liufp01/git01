/*
 * @Author: your name
 * @Date: 2020-03-18 10:27:57
 * @LastEditTime: 2020-03-26 13:39:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /产品定价2020_git/config/prod.env.js
 */
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_PATH:'""',
  BRANCH_ENV: JSON.stringify(process.env.BRANCH_ENV) || '"base"',
  ignoreCsrfToken:'"false"',
  // 生产环境请求地址⬇
  API_ROOT: ' "/api" '
}
