const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "my-project.js",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"],
    },
    devServer: {
        compress: true,
        port: 3000,
        historyApiFallback: true,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(__dirname, "tsconfig.json"),
                        },
                    },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.hbs$/,
                use: ["handlebars-loader"],
            },
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
    ],
};
