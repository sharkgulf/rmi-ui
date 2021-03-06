const path = require('path')

module.exports = {
  // 修改 pages 入口
  pages: {
    index: {
      entry: './examples/main.js', // 入口
      template: './public/index.html', // 模板
      filename: 'index.html', // 输出文件
    },
  },
  devServer: {
    hot: true, //自动保存
    open: true, //自动启动
    port: 8082, //默认端口号
    host: '0.0.0.0',
  },
  // 扩展 webpack 配置
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')

    // @ 默认指向 src 目录，这里要改成 examples
    // 另外也可以新增一个 ~ 指向 packages
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('~', path.resolve('packages'))

    // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  },
}
