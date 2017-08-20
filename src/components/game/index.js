import React, { PureComponent } from 'react'
import Tetris from '../tetris'

class Game extends PureComponent{
  render() {
    const { pause, stream } = this.props
    return <div>
      <div>Game pause: {`${!!pause}`}</div>
      <Tetris stream={stream} pause />
    </div>
  }
}

export default Game
