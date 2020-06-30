import React, { Component } from 'react'

import Board from './components/Board/index';
import BoardHead from './components/BoardHead';

export default class Minesweeper extends Component {
  constructor() {
    super()

    this.state = {
      rows: 5,
      cells: 5,
      flags: 2,
      mines: 2,
      revealedCells: 0,
      isGameOver: false,
      isPlayerWon: false
    }

    this.updateFlags = this.updateFlags.bind(this);
  }

  // what ever happend on the board now need to be ruled by the game rules
  updateFlags(flag) {
    this.setState({ flags: this.state.flags - flag })
  }

  endGame(isWon) {
    if (isWon) {
      alert('Seem like you won this one');
    } else {
      alert(`Your fight is over!`);
    }
  }

  render() {
    return (
      <div className="mine-sweeper">
        <BoardHead flags={this.state.flags} />
        <Board
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
