const path = require('path')
const argvs = process.argv.slice(2)
 
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
 
function getParams(key) {
  let item = argvs.find(item => item.split('=')[0] === key)
  return item ? item.split('=') : []
}
 
function getModuleAlias() {
  let alias = {}
  importModules.forEach(name => {
    alias[`@${name}`] = resolve(`src/${name}`)
  })
  return alias
}
 
function getModuleProcess(name) {
  if (!importModules.includes(name)) {
    name = importModules[0]
  }
  return {
    name,
    entry: ["babel-polyfill", `./src/apps/${name}/main.js`],
    alias: resolve(`src/${name}`),
    index: path.resolve(__dirname, `../dist/frm-secma-approval-fe/${name}/index.html`),
    assetsRoot: path.resolve(__dirname, `../dist/frm-secma-approval-fe/${name}/`)
  }
}
// 多项目配置
var importModules = ['approval',
                    'companies_deposits',
                    'personal_deposits',
                    'companies_loan',
                    'personal_loan',
                    'report_form',
                    'benchmark_rate',
                    'featured_price',

    ]

var lifecycleEvents = String(process.env.npm_lifecycle_event).split(':')
var moduleName = getParams('name')[1] || lifecycleEvents[1]
const multiConfig = {
  modules: importModules,
  moduleAlias: getModuleAlias(),
  process: getModuleProcess(moduleName)
}
module.exports = multiConfig