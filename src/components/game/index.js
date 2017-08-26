import React, { PureComponent } from 'react'
import Tetris from '../tetris'
import './styles.css'

class Game extends PureComponent{
  render() {
    const { pause, stream, player } = this.props
    const status = stream.active ? 'Connected' : 'Not connected'
    return <div className="game-wrapper">
      <div className="player-status">Player {player}: {status}</div>
      <Tetris
        player={player}
        stream={stream}
        pause={pause} />
    </div>
  }
}

export default Game
