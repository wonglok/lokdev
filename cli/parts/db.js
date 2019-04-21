import mkdirp from 'mkdirp'
import path from 'path'
import fs from 'fs'
export const initDB = (file, port) => {
  return new Promise((resolve, reject) => {
    let dirr = path.dirname(file)
    mkdirp(dirr, (err) => {
      if (err) {
        reject(new Error('cannot create folder'))
      } else {
        if (!fs.existsSync(path.join(dirr, './sdk.js'))) {
          let data = fs.readFileSync(path.join(__dirname, '../sdk/sdk.js'))
          data = data.replace('2329', port || 2329)
          fs.writeFileSync(path.join(dirr, './sdk.js'), data)
        }

        const low = require('lowdb')
        const FileSync = require('lowdb/adapters/FileSync')
        const adapter = new FileSync(file)
        const db = low(adapter)
        resolve(db)
      }
    })
  })
}
