var fs = require('fs')
var path = require('path')

export const provideConfig = () => {
  return new Promise((resolve, reject) => {
    let configInfo = {
      uidb: './src/ui-database/data.json',
      port: '2329'
    }
    let rcPath = path.join(process.cwd(), './.uidbrc.js')
    let rc = `
module.exports = ${JSON.stringify(configInfo, null, '\t')};
`

    if (!fs.existsSync(rcPath)) {
      fs.writeFile(rcPath, rc, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(require(rcPath))
        }
      })
    } else {
      resolve(require(rcPath))
    }
  })
}
