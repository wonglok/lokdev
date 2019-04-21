export const init = ({ port, db }) => {
  var http = require('http').Server()
  var io = require('socket.io')(http)

  io.of('devkit').on('connection', (socket) => {
    console.log('a user connected')

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
