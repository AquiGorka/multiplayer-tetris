import React, { Component } from 'react'
import Piece from 'nilssongames-tetris/lib/piece.js'
import Board from 'nilssongames-tetris/lib/board.js'

const game = {
  lastInterval: 0,
  timeBetweenUpdates: 1000,
  timeSinceLastUpdate: 0,
  piece: new Piece,
  board: new Board,
  gameOver: false,
  paused: true,
  controlKeys: {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  },
  context: null
};

function draw() {
  game.board.draw(game.context);
  game.piece.draw(game.context);
}

function update() {
  game.piece.update(game.board);
}


function handleEvent(e) {
  console.log('received event: ', e)
  /*
  var dir = game.controlKeys[e.keyCode];

  if (dir) {
    e.preventDefault();
    game.piece.move(dir, game.board);

    if (dir === 'down') {
      game.timeSinceLastUpdate = 0;
    } else if (dir === 'up') {
      game.piece.rotateRight(game.board);
    }
  }
  */
}

class Tetris extends Component {
  
  state = { pause: true }

  componentDidMount() {
    const { pause, stream } = this.props
    game.context = this.refs.canvas.getContext('2d');
    console.log(stream)
    stream.on('data', handleEvent)
    stream.on('event', handleEvent)
    stream.on('shake', handleEvent)
    this.setState({ pause })
    this.loop();
  }

  componentWillReceiveProps(props) {
    console.log('Will Receive props:', props)
    const { pause } = props
    // pause?
    this.setState({ pause })
    this.loop()
  }

  render() {
    return (
      <canvas
        width={game.board.width}
        height={game.board.height}
        ref="canvas"
      />
    );
  }

  loop = (time = 0) => {
    const { pause } = this.state
    if (!pause) {
      const deltaTime = time - game.lastInterval;
      game.lastInterval = time;
      game.timeSinceLastUpdate += deltaTime;
  
      if (game.timeSinceLastUpdate > game.timeBetweenUpdates) {
        update();
        game.timeSinceLastUpdate = 0;
      }
      draw();
      requestAnimationFrame(this.loop);
    }
  }
}

export default Tetris
