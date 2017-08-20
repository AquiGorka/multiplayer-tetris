import config from '../../../config'
import Peer from 'peerjs'
import EventEmitter from 'event-emitter'

class Connection extends EventEmitter {
  constructor({ conn = null } = {} ) {
    super()
    this.active = false
    if (conn) {
      this.active = true
      conn.on('data', data => {
        console.log('received data: ', data)
        switch(data) {
          case 'shake':
          case 'swipe-left':
          case 'swipe-rigth':
          case 'swipe-up':
          case 'swipe-down':
            console.log('emit event')
            this.emit(data)
            break;
        }
      })
    }
  }
}

const NULL_CONNECTION = new Connection()

class Server extends EventEmitter {
  constructor({ max = 1 }) {
    super()
    this.connections = Array(max).fill(NULL_CONNECTION)
    this.peer = new Peer('server', config)
    this.peer.on('connection', conn => {
      const nextAvailableIndex = this.connections.reduce((p, c, i) => {
        if (p === -1 && !c.active) {
          p = i
        }
        return p
      }, -1)
      if (nextAvailableIndex < max) {
        this.connections[nextAvailableIndex] = new Connection({ conn })
        conn.on('disconnect', () => {
          this.connections[nextAvailableIndex] = new Connection()
          this.emit('disconnect')
        })
        this.emit('connect')
      }
    })
  }
}

export default Server
