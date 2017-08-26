import React, { Component } from 'react'
import Piece from 'nilssongames-tetris/lib/piece.js'
import Board from 'nilssongames-tetris/lib/board.js'
import './styles.css'

class Tetris extends Component {
  
  state = {
    pause: true,
    game: {
      lastInterval: 0,
      timeBetweenUpdates: 1000,
      timeSinceLastUpdate: 0,
      piece: new Piece,
      board: new Board,
      gameOver: false,
      paused: true,
      context: null,
    },
 }

  componentDidMount() {
    const { pause, stream, player } = this.props
    const { game } = this.state
    game.context = this.refs[`canvas_${player}`].getContext('2d')
    this.setupEvents(stream)
    this.setState({ pause }, this.loop)
  }

  componentWillReceiveProps(props) {
    const { pause, stream } = props
    this.setupEvents(stream)
    this.setState({ pause }, this.loop)
  }

  render() {
    const { player } = this.props
    const { game } = this.state
    return (
      <canvas
        width={game.board.width}
        height={game.board.height}
        className="board"
        key={player}
        ref={`canvas_${player}`}
      />
    )
  }

  loop = (time = 0) => {
    const { pause, game } = this.state
    if (!pause) {
      const deltaTime = time - game.lastInterval
      game.lastInterval = time
      game.timeSinceLastUpdate += deltaTime
      if (game.timeSinceLastUpdate > game.timeBetweenUpdates) {
        this.update()
        game.timeSinceLastUpdate = 0
      }
      this.draw()
      requestAnimationFrame(this.loop)
    }
  }

  setupEvents = stream => {
    stream.off('event', this.handleEvent)
    stream.on('event', this.handleEvent)
  }
  
  handleEvent = e => {
    const { player } = this.props
    const { game } = this.state
    //console.log(`Player: ${player} received event: ${e}`)
    let dir = 'noop'
    switch(e) {
      case 'swipe-left':
        dir = 'left'
        break
      case 'swipe-right':
        dir = 'right'
        break
      case 'swipe-up':
        dir = 'up'
        break
      case 'swipe-down':
        dir = 'down'
        break
    }
    game.piece.move(dir, game.board)
    if (dir === 'down') {
      game.timeSinceLastUpdate = 0;
    } else if (dir === 'up') {
      game.piece.rotateRight(game.board);
    }
  }

  draw = () => {
    const { game } = this.state
    game.board.draw(game.context)
    game.piece.draw(game.context)
  }
  
  update = () => {
    const { game } = this.state
    game.piece.update(game.board)
  }

}

export default Tetris
