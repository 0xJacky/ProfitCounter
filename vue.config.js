const webpack = require('webpack')

module.exports = {
    pages: {
        surface: {
          // page 的入口
          entry: 'src/main.js',
          // 模板来源
          template: 'public/index.html',
          // 在 dist/index.html 的输出
          filename: 'index.html',
          // 当使用 title 选项时，
          // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'ProfitCounter',
          // 在这个页面中包含的块，默认情况下会包含
          // 提取出来的通用 chunk 和 vendor chunk。
          chunks: ['chunk-vendors', 'chunk-common', 'surface']
        }
    },

    productionSourceMap: false,

    css: {
        loaderOptions: {
            css: {},
            postcss: {},
            less: {
                javascriptEnabled: true
            }
        },
        extract: false
    },

    configureWebpack: config => {
        config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
        if (process.env.NODE_ENV === 'production') {
            config.performance = {
                hints: 'warning',
                // 入口起点的最大体积
                maxEntrypointSize: 50000000,
                // 生成文件的最大体积
                maxAssetSize: 30000000,
                // 只给出 js 文件的性能提示
                assetFilter: function (assetFilename) {
                    return assetFilename.endsWith('.js')
                }
            }
        }
    },

    publicPath: '',

    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                win: {
                    icon: 'src/assets/icon.ico',
                    // 图标路径 windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
                    target: [{
                        // 打包成一个独立的 exe 安装程序
                        target: 'nsis',
                        // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
                        'arch': [
                            'x64'
                            // 'ia32'
                        ]
                    }]
                },
                mac: {
                    icon: 'src/assets/icon.png'
                },
                files: ['**/*'],
                //asar: false,
                nsis: {
                    // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
                    oneClick: false,
                    // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    allowElevation: true,
                    // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
                    allowToChangeInstallationDirectory: true,
                    // 安装图标
                    installerIcon: 'src/assets/icon.ico',
                    // 卸载图标
                    uninstallerIcon: 'src/assets/icon.ico',
                    // 安装时头部图标
                    installerHeaderIcon: 'src/assets/icon.ico',
                    // 创建桌面图标
                    createDesktopShortcut: true,
                    // 创建开始菜单图标
                    createStartMenuShortcut: true
                }
            }
        }
    }
}
