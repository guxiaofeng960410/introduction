const path = require('path');

module.exports ={
    mode: 'development',

    entry: __dirname +'/public/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer:{
        contentBase: __dirname + '/dist',
        port: 3000,
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ]
            }
        ]
    },
}