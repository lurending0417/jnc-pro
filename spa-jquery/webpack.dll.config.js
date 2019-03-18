const webpack = require('webpack')
const path = require('path')

const config = {
    entry: {
        vendor: [
            "jquery",
            "./node_modules/bootstrap/dist/js/bootstrap.min.js"
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'), // 输出的路径
        filename: '[name].dll.js', // 输出的文件，将会根据entry命名为vendor.dll.js
        library: '[name]_library' // 暴露出的全局变量名
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, './dist/', '[name]-mainfest.json'), // 描述依赖对应关系的json文件
            name: '[name]_library',
            context: __dirname // 执行的上下文环境，对之后DllReferencePlugin有用
        })
    ]
}

module.exports = config;
