import React, { PureComponent } from 'react'
import Game from '../game'
import Server from '../../lib/webrtc-peer/server'

class Connections extends PureComponent {

  state = { server: null }

  componentWillMount() {
    this.setState({ ts: Date.now(), server: new Server({ max: 2 }) })
  }

  componentDidMount() {
    const { server } = this.state
    server.on('connect', () => this.setState({ ts: Date.now() }))
    server.on('disconnect', () => this.setState({ ts: Date.now() }))
  }

  render() {
    const { server } = this.state
    const { connections } = server
    const pause = !connections[0].active || !connections[1].active
    return <div>
      <Game pause={!connections[0].active} stream={connections[0]} />
      <Game pause={!connections[1].active} stream={connections[1]} />
    </div>
  }
}

export default Connections
