const Path = require('path'),
    Webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    Dashboard = require('webpack-dashboard'),
    DashboardPlugin = require('webpack-dashboard/plugin'),
    BUILD_PATH = 'build',
    SRC = 'src',
    packageJSON = require('./package.json');

const ASSET_PATH = process.env.ASSET_PATH || '/';
const vendors = ['moment'];

const config = {
    entry: {
        index: Path.join(__dirname, SRC, 'entry/index.jsx'),
        vendor: vendors
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: Path.resolve(__dirname, BUILD_PATH),
        pathinfo: true,
        publicPath: ASSET_PATH
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 2 }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: packageJSON.theme
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(file) {
                                return '[name][hash].[ext]'
                            },
                            outputPath: './assets/images/'
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([`${BUILD_PATH}`], {
            root: __dirname,
            verbose: true,
            dry: false,
            exclude: ['favicon.ico']
        }),
        new CopyWebpackPlugin([
            { from: './favicon.ico' },
            { from: './src/assets/fonts', to: './assets/fonts' },
            { from: './src/assets/media', to: './assets/media' },
        ]),
        // new DashboardPlugin({ port: 81 }, new Dashboard().setData),
        new HtmlWebpackPlugin({
            title: packageJSON.title,
            template: `${SRC}/index.ejs`,
            favicon: `./${BUILD_PATH}/favicon.ico`,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new Webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: JSON.stringify('production'),
                ASSET_PATH: JSON.stringify(ASSET_PATH)
            }
        }),
        // new Webpack.HotModuleReplacementPlugin(),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new Webpack.optimize.UglifyJsPlugin({
            beautify: false,
            sourceMap: true,
            compress: {
                warnings: true// 方便项目上线能发现bug,不压缩警告信息
            }
        }),
        new ExtractTextPlugin('style.[contenthash].css')
    ],
    resolve: {
        modules: [
            Path.join(__dirname, SRC),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.json', '.css', '.less']
    },
}

module.exports = config;