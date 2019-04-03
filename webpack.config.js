const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports ={
    mode: 'development',

    entry: __dirname +'/public/index.js',
    output: {
        filename: 'bundle.js',
    path: path.resolve(__dirname + '/dist')
    },
    devtool: 'source-map',
    devServer:{
        contentBase: __dirname + '/dist',
        port: 3000,
    },
    
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/view/index.html'
        })
    ],
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