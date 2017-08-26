import React, { PureComponent } from 'react'
import Game from '../game'
import { Server } from '../../lib/webrtc-peer'
import './styles.css'

const Pause = () => {
  return <div className="pause">Pause</div>
}

const Over = () => {
  return <div className="over">Game Over</div>
}

class Connections extends PureComponent {

  state = { server: null, over: false }

  componentWillMount() {
    this.setState({ ts: Date.now(), server: new Server({ max: 2 }) })
  }

  componentDidMount() {
    const { server } = this.state
    server.on('connect', () => this.setState({ ts: Date.now() }))
    server.on('disconnect', () => this.setState({ ts: Date.now() }))
  }

  render() {
    const { server, over } = this.state
    const { connections } = server
    const pause = !connections[0].active || !connections[1].active
    return <div className="wrapper">
      {pause && <Pause />}
      {over && <Over />}
      <div key="1" className="game">
        <Game
          player="1"
          pause={pause || over}
          onOver={() => this.setState({ over: true})}
          stream={connections[0]} />
      </div>
      <div key="2" className="game">
        <Game
          player="2"
          pause={pause || over}
          onOver={() => this.setState({ over: true })}
          stream={connections[1]} />
      </div>
    </div>
  }
}

export default Connections
