import React, { Component } from 'react'

import Board from './components/Board/index';
import BoardHead from './components/BoardHead';

export default class Minesweeper extends Component {
  constructor() {
    super()

    this.state = {
      rows: 5,
      cells: 5,
      flags: 1,
      mines: 1,
      isGameOver: false,
      isWon: false,
      gameActions: 0
    }

    this.endGame = this.endGame.bind(this);
    this.updateFlags = this.updateFlags.bind(this);
  }

  // what ever happend on the board now need to be ruled by the game rules
  updateFlags(flag) {
    this.setState({ flags: this.state.flags - flag })
  }

  endGame(isWon) {
    if (!this.state.isGameOver) {
      this.setState({ isGameOver: true, isWon });
    }
  }

  restartGame() {
    this.setState({ gameActions: 0 })
  }

  render() {
    const classes = this.state.isGameOver ? 'mine-sweeper game-over' : 'mine-sweeper'

    return (
      <div className={classes}>
        <BoardHead isGameOver={this.state.isGameOver} isWon={this.state.isWon} flags={this.state.flags} />
        <Board
          blockBoard={this.state.isGameOver}
          rows={this.state.rows}
          cells={this.state.cells}
          mines={this.state.mines}
          flags={this.state.flags}
          updateFlags={this.updateFlags}
          endGame={this.endGame}
        />
      </div>
    )
  }
}
