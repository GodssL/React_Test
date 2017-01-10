/*
    path是node的一个对象, resolve是路径寻航, 相当于不断调用cd命令...
 */
const path = require("path");
const webpack = require("webpack");

module.exports = {
    /*
        入口js
     */
    entry: {
        "dll-user": ["./index.js"]
    },
    /*
        支持热加载, 方便调试
     */
    devServer:{
        inline: true
    },
    output: {
        /*
            "__dirname" 是Node.js中的一个全局变量, 它指向当前执行脚本所在的目录
            path: 是webpack打包后生成的路径, 这个相当于C#的bin文件夹...
            publicPath: 是webpack-dev-server打包生成的路径, 这个路径是在内存里面, 外面没有实体文件的
            当测试的时候我们访问的是publicPath路径下的bundle.js
            真实打包之后我们访问的是build下面的bundle.js文件
         */
        path: path.join(__dirname, "dist"),
        publicPath: "/assets/",
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            // 这里是除了node_modules文件夹里面的js外其他都走babel, 增加编译(官网已经用compilation这个单词了)效率
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack
    ]
};