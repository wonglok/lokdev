import io from 'socket.io-client'
let socket = false
if (process.env.NODE_ENV === 'production') {
} else {
  socket = io(`${window.location.hostname}:${2329}/devkit`)
}

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

export const getRealTimeUpdates = ({
  onRootArrived = () => {},
  getRoot = () => {},
  refresh = () => {}
}) => {
  let clean = () => {}
  if (process.env.NODE_ENV === 'production') {
    onRootArrived(require('./data.json'))
  } else {
    let onDBOArrived = (data) => {
      console.log(data)
      let root = getRoot()
      transformDoc(root, data)
      refresh()
    }
    socket.on('push:dbo', onDBOArrived)
    socket.on('push:root', onRootArrived)
    socket.emit('req-push:root', {})
    clean = () => {
      socket.off('push:root', onRootArrived)
      socket.off('push:dbo', onDBOArrived)
    }
  }
  return clean
}

export const getCollection = (root, collectionName) => {
  return root.dbs[collectionName]
}

export const doDBO = ({ db, op = 'upsert', oid, data }) => {
  socket.emit('req:dbo', {
    db,
    op,
    oid,
    package: data
  })
}

export const save = (v, cb) => {
  socket.emit('req-save:root', v, cb)
}

export const getItem = (root, dbID, keyname) => {
  return root.dbs[dbID].arry.find(a => a.keyname === keyname)
}
