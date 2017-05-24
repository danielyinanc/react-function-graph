
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './src/index.js',
  output: { path: __dirname+'/dist', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
            { test: /\.css$/, loader: "style-loader!css-loader" }

    ]
  },
};