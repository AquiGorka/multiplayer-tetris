import React, { PureComponent } from 'react'
import Tetris from '../tetris'

class Game extends PureComponent{
  render() {
    const { pause, stream, player } = this.props
    return <div>
      <div>Game pause: {`${!!pause}`}</div>
      <Tetris
        player={player}
        stream={stream}
        pause={pause} />
    </div>
  }
}

export default Game
