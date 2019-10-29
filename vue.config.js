module.exports = {
  //axios域代理，解决axios跨域问题
  publicPath: '/',
  devServer: {
  proxy: {
    '/api': {
      target: 'http://localhost:8090',
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    }
  }
  }
}