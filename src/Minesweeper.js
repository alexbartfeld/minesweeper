import React, { Component } from 'react'

import Board from './components/Board/index';
import BoardHead from './components/BoardHead';

export default class Minesweeper extends Component {
  state = {
    rows: 10,
    cells: 10,
    flags: 10,
    mines: 10    
  }

  render() {
    return (
      <div className="mine-sweeper">
        <BoardHead flags={this.state.flags} />
        <Board
          rows={this.state.rows}
          cells={this.state.cells}
          mines={this.state.mines}
          revealedCells={this.state.revealedCells}
        />
      </div>
    )
  }
}
