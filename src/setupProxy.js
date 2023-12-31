const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/user',{
            target: 'http://localhost:8080',
            changeOrigin: true,
        }),
        createProxyMiddleware('/emp',{
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    )
}