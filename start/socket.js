'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

Ws.channel('forum', ({ socket }) => {
  //console.log('user joined with %s socket id', socket.id)
  socket.on('message', (msg) => {
    socket.broadcastToAll('message', msg)
  })
}).middleware(['auth'])
