
// 当前运行项目、环境信息
const config = require('./.env.config.js')
// 
const projectName = config.projectName;
module.exports = {
  lintOnSave: true, //保存时lint
  productionSourceMap: false, //生产环境不要sourcemap
  outputDir: config.outputDir,
  publicPath: config.publicPath,
  devServer: {
    port: 8181, // 端口号
    host: "0.0.0.0",
    https: false, //
    open: false, //配置自动启动浏览器
    proxy: config.proxy
  },
  pages: {
    [projectName]: config.page
  },
};