const path = require('path')
// const webpack = require('webpack')
// 导入在内存中生成HTML的插件
const htmlWebpackPlugin = require('html-webpack-plugin')
// 向外暴露一个配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'), //入口文件
    output: {
        path: path.join(__dirname, './dist'), //打包到
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    module: { //配置所有的第三方模块 加载器
        rules: [//所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader']},
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            { test: /\.jpg|png|gif|bmp|jpeg$/, use: 'url-loader?limit=236745&name=[hash:8]-[name].[ext]' },
            { test: /\.ttf|eot|svg|woff|woff2$/, use: 'url-loader'},
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    resolve: { 
        alias: { //设置vue被导入时的路径
            "vue$": "vue/dist/vue.js"
        }
    }
}

