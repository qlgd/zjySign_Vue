/**
 * PostCSS 配置文件
 */

module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}

