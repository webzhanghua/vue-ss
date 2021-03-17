

const spawn = require('cross-spawn')
const { outputConfigFn } = require('./base.config.js')

const writeFile = require("fs").writeFile;
const env = process.argv[2] || '';
const projectName = process.argv[3] || '';
const outputText = outputConfigFn(env, projectName)
writeFile(".env.config.js", `module.exports=${outputText}`, err => {
  if (err) throw err;
  spawn("npm", ["run", "build-core"], { stdio: "inherit" });
});
