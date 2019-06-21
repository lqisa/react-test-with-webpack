const path = require('path')
const config = require('../config')
const devMode = process.env.NODE_ENV !== 'production'
console.log(`devMode: ${devMode}`)

// Extract text from a bundle, or bundles, into a separate file.
// 此处用于从bundle.js中提取CSS文件到单独的文件
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Since webpack v4 the `extract-text-webpack-plugin` should **not be used** for css.Use mini-css-extract-plugin instead. (https://github.com/webpack-contrib/mini-css-extract-plugin)
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// simplifies creation of HTML files to serve your webpack bundles
// especially useful for webpack bundles that include a `hash` in the filename which changes every compilation
// You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  // JavaScript 执行文件入口 (default: `./src/index.js`)
  // entry: string | Array<string> | {[entryChunkName: string]: string|Array<string>}
  entry: './src/main.js', // entry: ['./src/main.js']
  // 上述写法是以下的简写
  /* entry: {
    main: './src/main.js'
  } */
  /**
   * mode: development | production (default) | none
   */
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'cheap-eval-source-map' : '',
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    // 修复cannot GET /xxxx
    historyApiFallback: true,
  },
  // 告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，主输出文件**默认**为 `./dist/main.js`，
  // 其他生成文件的**默认**输出目录是 `./dist。`
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: path.posix.join(config.build.assetsSubDirectory, 'js/[name].[hash].js'),
    /**
     *  path.resolve 对路径进行解析 & 连接
     * __dirname 当前执行脚本所在的目录 (即该webpack.config.js的绝对路径)
     */
    // 输出文件都放到 dist 目录下
    // path: path.resolve(__dirname, '../dist')

    path: path.posix.join(config.build.assetsRoot, devMode ? 'test' : 'prod'),

    /**
     *  错误写法： path: './dist'
     * The output directory as **absolute path** (required)
     */
    // publicPath: './'
  },
  /**
   * Loader 可以看作具有文件转换功能的翻译员
   * 配置里的 module.rules 数组配置了一组规则, 告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换
   *
   * 作为开箱即用的自带特性，webpack 自身**只支持** JavaScript。
   * 而 loader 能够让 webpack 处理那些非 JavaScript 文件，并且先将它们转换为有效 模块，然后添加到依赖图中，
   * 这样就可以提供给应用程序使用。
   * (loader 能够 import 导入**任何类型**的模块（例如 .css 文件），这是 webpack 特有的功能，
   * 其他打包程序或任务执行器的可能并不支持)
   *
   * 有三种使用 loader 的方式:
   * 1. 配置（推荐）：在 webpack.config.js 文件中指定 loader。
   * 2. 内联：在每个 import 语句中显式指定 loader。
   *    1) 使用 ! 将资源中的 loader 分开:
   *      `import Styles from 'style-loader!css-loader?modules!./styles.css';`)
   *    2) 选项可以传递查询参数，例如 ?key=value&foo=bar，或者一个 `JSON 对象`，例如 ?{"key":"value","foo":"bar"}
   * 3. CLI：在 shell 命令中指定它们。
   *    `webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'`
   *    这会对 `.jade` 文件使用 `jade-loader`，对 `.css` 文件使用 `style-loader` 和 `css-loader`
   */
  module: {
    rules: [
        /**
         *  用正则去匹配要使用该 loader 转换的 CSS 文件
         *  1. use 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是"由后到前"的
         *  2. 每一个 Loader 都可以通过 URL querystring 的方式传入参数 (minimize 告诉 css-loader 要开启 CSS 压缩)
         */
      {
        test: /\.(sa|sc)ss$/,
        /*
        先使用 css-loader 读取 CSS 文件，再交给 style-loader 把 CSS 内容注入到 JavaScript 里
        use: ['style-loader', 'css-loader']
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              import: false
            }
          }
        ]*/

        // 从bundle.js中提取CSS文件到单独的文件
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['style-loader', 'css-loader']
        // })

        use: [
          devMode? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: devMode ? ['@babel/transform-react-jsx-source'] : []
          }
        }
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  // Plugin 是用来扩展 Webpack 功能的，通过在构建流程里注入钩子实现
  // 你也可以在一个配置文件中因为不同目的而**多次使用同一个插件**，这时需要通过使用 `new` 操作符来创建它的一个实例。
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"development"'
    //   }
    // }),
    new htmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    /**
     *  它将所有的输入代码块的*.css模块放入一个独立的CSS文件中。因此如果你的样式文件不再嵌入（inlined into）JS
     * Bundle中，而是在一个独立的CSS文件中。如果你的所有的样式（stylesheet volume）体积很大，这将会更快，因为
     * CSS Bundle与JS Bundle并行加载
     * Details: (https://www.npmjs.com/package/extract-text-webpack-plugin)
     */
    /*
    new ExtractTextPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename: path.posix.join(outputPath, `css/[name]_[md5:contenthash:base64].css`) // ExtractTextPlugin generates a file per entry, so you must use [name], [id] or [contenthash] when using multiple entries
    })
    */

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: path.posix.join(config.build.assetsSubDirectory, devMode ? `css/[name].css` : `css/[name].[hash].css`),
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ]
}
