import React, { Component } from 'react'

import Board from './components/Board/index';
import BoardHead from './components/BoardHead';

export default class Minesweeper extends Component {
  constructor() {
    super()

    this.state = {
      rows: 10,
      cells: 10,
      flags: 1,
      mines: 20,
      revealedCells: 0,
      isGameOver: false,
      isPlayerWon: false
    }

    this.onCellClick = this.onCellClick.bind(this);
  }

  // what ever happend on the board now need to be ruled by the game rules
  onCellClick(status) {
    const { flag, isMine, openedCells } = status;
    if (isMine) {
      alert('Boom you just exploeded!');
    }
    this.setState({ flags: this.state.flags - flag })
    // see if openedCells === (row * cells) - mines && all mines are flagged

  }

  render() {
    return (
      <div className="mine-sweeper">
        <BoardHead flags={this.state.flags} />
        <Board
          rows={this.state.rows}
          cells={this.state.cells}
          mines={this.state.mines}
          onCellClick={this.onCellClick}
        />
      </div>
    )
  }
}
