const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const ImageMinPlugin = require("imagemin-webpack-plugin").default;

const path = require("path");
const glob = require("glob");

const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  mode: "production",

  devtool: false,

  entry: "./src/app.js",

  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            // Using file-loader for these files
            loader: "file-loader",

            // In options we can set different things like format
            // and directory to save
            options: {
              outputPath: "images",
            },
          },
        ],
      },

      {
        // Apply rule for fonts files
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            // Using file-loader too
            loader: "file-loader",
            options: {
              outputPath: "fonts",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "custom-templates",
      template: "./src/index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new ImageMinPlugin({ test: /\.(jpg|jpeg|png|gif|svg)$/i }),
    new CleanWebpackPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, {
        nodir: true,
      }),
    }),
  ],
};
