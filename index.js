const child_process = require('child_process')

const { npm_package_name, npm_package_version } = process.env
const branchName = child_process.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
const commitHash = child_process.execSync('git rev-parse HEAD').toString().trim()

class BranchNotesPlugin {
  constructor(options = {}) {
    this.includes = options.includes || ['packageName', 'packageVersion', 'branchName', 'commitHash']
  }

  apply(compiler) {
    compiler.hooks.emit.tap('BranchNotesPlugin', (compilation) => {
      Object.keys(compilation.assets).forEach((data) => {
        let content = compilation.assets[data].source(); // 获取处理的文本

        if (data.endsWith('js')) {
          let infoMap = {
            packageName: npm_package_name,
            packageVersion: npm_package_version,
            branchName,
            commitHash
          }

          content = `/*${this.includes.map(i => infoMap[i]).join(' | ')} */\n${content}`
        }

        compilation.assets[data] = {
          source() {
            return content;
          },
          size() {
            return content.length;
          }
        }
      });
    });
  }
}

module.exports = BranchNotesPlugin
