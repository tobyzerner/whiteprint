const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "bundle.css",
});

module.exports = {
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'tslint-loader',
                enforce: 'pre'
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader'
            }
        ],
    },
    plugins: [
        new CheckerPlugin(),
        extractSass
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        library: 'whiteprint',
        libraryTarget: 'var'
    },
    externals: {
        mithril: 'm',
    }
};
