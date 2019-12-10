const path = require('path')
const root = __dirname

var pagesList = {
    index: {
        entry: path.join(root, 'source', 'main.js'),
        template: path.join(root, 'public', 'index.pug'),
        filename: 'index.html'
    }
}

module.exports = {
    publicPath: '/',
    pages: pagesList,
    filenameHashing: false,
    productionSourceMap: false,
    outputDir: path.join(root, 'dist'),
    configureWebpack: {
        resolve: {
            alias: {
                'root': root,
                ':root': root,

                'src': path.join(root, 'source'),
                ':src': path.join(root, 'source')
            }
        },

        externals: [(c, request, callback) => {
            return ['electron'].indexOf(request) >= 0
                ? callback(null, `require('${request}')`)
                : callback()
        }]
    }
}