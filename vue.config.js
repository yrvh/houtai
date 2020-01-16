
module.exports = {
  devServer: {
    open: false,
    https: false,
    hotOnly: false,
    proxy: {
      '/ponyproperty-manager': {
        target: 'http://192.168.2.88:8001',
        changeOrigin: true,
        ws:true,
      },
      '/api': {
        target: 'http://39.97.33.178',
        changeOrigin: true,
        ws:true,
      }
    }
  }
}