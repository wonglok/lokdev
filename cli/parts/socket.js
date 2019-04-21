export const transformDoc = (root, data) => {
  if (data.db && data.op && data.oid && data.package) {
    root.dbs = root.dbs || {}
    //
    root.dbs[data.db] = root.dbs[data.db] || {
      array: []
    }

    let array = root.dbs[data.db].array
    if (data.op === 'upsert') {
      let idx = array.findIndex(ii => ii.oid === data.oid)
      if (idx === -1) {
        array.push(data.package)
      } else {
        array[idx] = data.package
      }
    }
    if (data.op === 'remove') {
      let idx = array.findIndex(ii => ii.oid === data.oid)
      array.splice(idx, 1)
    }
  }
  return root
}

export const init = ({ port, db }) => {
  var http = require('http').Server()
  var io = require('socket.io')(http)

  io.of('devkit').on('connection', (socket) => {
    console.log('a user connected')

    socket.join('all')

    let debounceSaveRoot = 0
    let trySaveRoot = (data, cb) => {
      clearTimeout(debounceSaveRoot)
      debounceSaveRoot = setTimeout(() => {
        db.setState(data).write()
        cb && cb(data)
      }, 100)
    }

    socket.on('req-save:root', (data, cb) => {
      trySaveRoot(data, cb)

      socket.emit('push:root', data)
      socket.to('all').emit('push:root', data)
    })

    socket.on('req:dbo', (info) => {
      let data = info
      let root = db.getState()
      transformDoc(root, data)

      trySaveRoot(root)

      socket.emit('push:dbo', info)
      socket.to('all').emit('push:dbo', info)
    })

    socket.on('req-push:root', () => {
      socket.emit('push:root', db.getState())
    })

    socket.on('disconnect', () => {
      console.log('a user disconnected')
    })
  })

  http.listen(port, () => {
    console.log('listening on *:' + port)
  })
}
