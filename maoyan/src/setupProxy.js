const proxy = require("http-proxy-middleware");
module.exports = function (app) {
    app.use("/maoyan",proxy({
        target:"http://m.maoyan.com",
        changeOrigin:true,
        pathRewrite:{
            "^/maoyan":""
        }
    }))
    app.use("/login",proxy({
        target:"http://127.0.0.1:80",
        changeOrigin:true,
        pathRewrite:{
            "^/login":""
        }
    }))

}