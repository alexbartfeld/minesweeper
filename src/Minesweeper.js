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
      isPlayerWon: false,
      gameActions: 0,
      superManMode: false
    }

    this.onBoardAction = this.onBoardAction.bind(this);
    this.endGame = this.endGame.bind(this);
    this.updateFlags = this.updateFlags.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.onSuperManClick = this.onSuperManClick.bind(this);
  }

  // what ever happend on the board now need to be ruled by the game rules
  updateFlags(flag) {
    this.setState({ flags: this.state.flags - flag })
  }

  endGame(isPlayerWon) {
    if (!this.state.isGameOver) {
      this.setState({ isGameOver: true, isPlayerWon });
    }
  }

  restartGame(rows, cells, mines) {
    this.setState(Object.assign({}, {
      rows,
      cells,
      flags: mines,
      mines,
      gameActions: 0,
      isGameOver: false,
      isPlayerWon: false,
    }))
  }

  onBoardAction() {
    this.setState({ gameActions: this.state.gameActions + 1 });
  }

  onSuperManClick() {
    this.setState({ superManMode: !this.state.superManMode });
  }

  render() {
    // const classes = this.state.isGameOver ? 'mine-sweeper game-over' : 'mine-sweeper'
    const classes = `mine-sweeper ${this.state.isGameOver ? 'game-over' : ''} ${this.state.superManMode ? 'super-man' : ''}`;

    return (
      <div className={classes}>
        <BoardHead
          onSuperManClick={this.onSuperManClick}
          restartGame={this.restartGame}
          isGameOver={this.state.isGameOver}
          isPlayerWon={this.state.isPlayerWon}
          rows={this.state.rows}
          cells={this.state.cells}
          mines={this.state.mines}
          flags={this.state.flags} />
        <Board
          revealAll={this.state.superManMode}
          blockBoard={this.state.isGameOver}
          rows={this.state.rows}
          cells={this.state.cells}
          mines={this.state.mines}
          flags={this.state.flags}
          updateFlags={this.updateFlags}
          endGame={this.endGame}
          onBoardAction={this.onBoardAction}
          resetBoard={this.state.gameActions}
        />
      </div>
    )
  }
}
