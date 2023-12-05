// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-pxtorem": {
      rootValue: 37.5, // 根据设计图尺寸写，设计图是1920，就写192
      propList: ['*'], // 需要被转换的属性
      selectorBlackList: [] // 不进行px转换的选择器
    }
  }
}
