const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: "eval-cheap-module-source-map",
    entry: {
        index: "./src/home-page/home.js",
        contact: "./src/contact-page/contact.js",
        events: "./src/events-page/events.js",
        team: "./src/team-page/team.js",
        sponsors: "./src/sponsors-page/sponsors.js"
    },
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: "expanded",
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                    // Please note we are not running postcss here
                ]
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: "[path][name].[ext]?hash=[hash:20]",
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/home-page/home.html",
            inject: true,
            chunks: ["index"],
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/contact-page/contact.html",
            inject: true,
            chunks: ["contact"],
            filename: "contact.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/events-page/events.html",
            inject: true,
            chunks: ["events"],
            filename: "events.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/team-page/team.html",
            inject: true,
            chunks: ["team"],
            filename: "team.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/sponsors-page/sponsors.html",
            inject: true,
            chunks: ["sponsors"],
            filename: "sponsors.html"
        })
    ]
};
