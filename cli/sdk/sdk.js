import UIDB from './data.json'
import io from 'socket.io-client'
let socket = false
if (process.env.NODE_ENV === 'production') {
} else {
  let port = UIDB.websocket
  if (!port) {
    throw new Error('no websocket port has set')
  }
  socket = io(`${window.location.hostname}:${port}/devkit`)
}

export const onRootDataArrive = (callback) => {
  if (process.env.NODE_ENV === 'production') {
    callback(UIDB)
  } else if (socket) {
    socket.on('push:root', (data) => {
      console.log('push:root', data)
      callback(data)
    })
    socket.emit('req-push:root', {})
  }
}
