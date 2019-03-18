# spa-jq
使用webpack打包jquery项目

## 项目技术栈
jquery bootstrap 

## 打包所使用技术
webpack

## plugin
extra-text-webpack-plugin: 提取css
html-webpack-plugin: 关联打包后的css、js文件
copy-webpack-plugin: 拷贝文件
webpack-dev-server: webpack的服务器，开发时在内存中打包文件并运行，可提高运行速度
webpack.optimize.CommonsChunkPlugin: 提取公共文件单独打包
webpack.optimize.UglifyJsPlugin: 丑化压缩js代码
webpack.ProvidePlugin: 自动加载模块，不用再引入模块即可加载

## loader
sass-resources-loader: 将配置文件注入打包出来的css文件中。
style-loader: 通过注入style标签的方式将css插入dom中。
css-loader: 打包css文件。
postcss-loader: 自动给css3新属性添加新属性。
less-loader/sass-loader: 打包less文件、sass文件。
file-loader/url-loader: 打包图片、字体文件。（在limit范围以内的文件会被url-loader打包成base64图片，超出范围的则会被file-loader处理。url-loader封装了file-loader）
babel-loader: 将es6转化为es5的语法

## 其他的
external: cdn资源，不会被打包
