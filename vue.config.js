const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  baseUrl: isProduction ? '/a-simple-todo-project/' : '/',
  css: {
    sourceMap: !isProduction,
    loaderOptions: {
      css: {
        camelCase: 'dashes'
      }
    }
  },
  configureWebpack: {
    plugins: [
      new StylelintWebpackPlugin({
        files: ['**/*.{vue,htm,html,css,scss,sass}']
      })
    ]
  },
  productionSourceMap: false
}
