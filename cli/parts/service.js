import * as WSSerice from './socket'

var fp = require('find-free-port')
var nodemon = require('nodemon')
var path = require('path')

export const init = ({ db }) => {
  fp(2329, (err, freePort) => {
    if (err) {
      throw new Error('no port')
    }

    db.set('websocket', freePort)
      .write()

    WSSerice.init({ port: freePort, db })

    nodemon({
      exec: `VUE_CLI_CONTEXT=${path.join(__dirname, '../../')} vue-cli-service serve --port ${freePort + 10} --open`,
      ignore: ['**/*']
    })
  })
}
