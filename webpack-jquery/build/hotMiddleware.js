// 参考 https://www.cnblogs.com/hawk-zz/p/9367587.html

const webpackHot = require('webpack-hot-middleware')
const PassThrough = require('stream').PassThrough;

const hotMiddleware = (compiler, opts) => {
    const middleware = webpackHot(compiler, opts);
    return async (ctx, next) => {
        let stream = new PassThrough()
        ctx.body = stream
        await middleware(ctx.req, {
            write: stream.write.bind(stream),
            writeHead: (status, headers) => {
                ctx.status = status
                ctx.set(headers)
            }
        }, next)
    }

}

module.exports = hotMiddleware;
