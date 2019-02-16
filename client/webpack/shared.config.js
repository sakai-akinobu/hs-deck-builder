const ExtractTextPlugin = require('extract-text-webpack-plugin');

export const createBaseConfig = () => ({
  entry: {
    app: ['./client/src/app/index.tsx'],
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.scss',
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true,
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require('autoprefixer')(),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                includePaths: [
                  'node_modules',
                ],
              },
            },
          ],
        }),
      },
    ],
  },
});
