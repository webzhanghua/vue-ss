
// 不同环境不同项目的代理地址
const proxyUrl = {
  'sub-pm': {
    local: "http://127.0.0.1:81/",
    test: "http://127.0.0.1:82/",
    produce: "http://127.0.0.1:83/"
  },
  'sub-pc': {
    local: "http://127.0.0.1:51/",
    test: "http://127.0.0.1:52/",
    produce: "http://127.0.0.1:53/"
  }
}
// 不同项目的配置信息
const config = {
  'sub-pm': {
    outputDir: 'sub-pm/dist',
    publicPath: '/sub-pm/dist',
    proxyConfig: ["/sub-pm-api/"],
    proxy: {},
    page: {
      entry: "src/sub-pm/main.js",
      template: "src/sub-pm/index.html",
      filename: "index.html",
      title: "pm项目",
    }
  },
  'sub-pc': {
    outputDir: 'sub-pc/dist',
    publicPath: '/sub-pc/dist',
    proxyConfig: ["/sub-pc-api/"],
    proxy: {},
    page: {
      entry: "src/sub-pc/main.js",
      template: "src/sub-pc/index.html",
      filename: "index.html",
      title: "pc项目",
    }
  },
}
/**
 * 返回当前命令生成的环境数据
 * @param {*} env 运行环境
 * @param {*} projectName 项目名称
 * @param {*} command 运行命令
 */
function outputConfigFn (env, projectName, command) {
  // 设置默认模块名称
  if (!projectName) {
    projectName = Object.keys(config)[0]
  }
  // 设置默认执行环境
  if (!env) {
    env = 'produce'
  }
  // 设置默认执行命令
  if (!command) {
    command = 'build'
  }
  // 汇总返回数据
  const returnObj = Object.assign({}, config[projectName], {
    env, projectName, command
  })
  // 设置代理数据
  returnObj.proxyConfig.forEach(key => {
    returnObj.proxy[key] = {
      target: proxyUrl[projectName][env],
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        ["^" + key]: ""
      }
    }
  })
  return JSON.stringify(returnObj)
}
module.exports = {
  outputConfigFn
};
