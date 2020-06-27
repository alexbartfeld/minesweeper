import React, { Component } from "react";
import Row from "../Row";

export default class Board extends Component {
  constructor(props) {
    super();

    this.state = {
      board: this.createBoard(props),
      revealedCells: 0
    };

    this.reveal = this.reveal.bind(this);
  }

  createBoard = (props) => {
    // creating empty game board
    const { rows, cells, mines } = props;
    let board = [];
    let minesLocations = [];

    for (let r = 0; r < rows; r++) {
      board.push([]);
      for (let c = 0; c < cells; c++) {
        board[r][c] = {
          c: c,
          r: r,
          nearByMines: 0,
          isOpen: false,
          hasMine: false,
          hasFlag: false
        };
      }
    }

    // add mines to the board
    for (let i = 0; i < mines; i++) {
      const ranRow = Math.floor(Math.random() * rows);
      const ranCell = Math.floor(Math.random() * cells);

      const cell = board[ranRow][ranCell];

      if (cell.hasMine) {
        i--; // let's try again
      } else {
        cell.hasMine = true;
        minesLocations.push([ranRow, ranCell]);
      }
    }

    // here we'll run over the mines array and update adjacent cells about the explosives
    for (let i = 0; i < minesLocations.length; i++) {
      let rowNum = minesLocations[i][0];
      let cellNum = minesLocations[i][1];

      for (let r = 1; r > -2; r--) {
        for (let c = 1; c > -2; c--) {
          if (r === 0 && c === 0) continue; // skip the mine cell
          if (board[rowNum - r] !== undefined) {
            const cell = board[rowNum - r][cellNum - c];
            if (cell !== undefined) {
              // make sure the cell itself does not have a mine
              if (!cell.hasMine) {
                cell.nearByMines++;
              }
            }
          }
        }
      }
    }
    console.log(board);
    return board;
  };

  reveal(cell) {
    const board = this.state.board;
    const currentCell = board[cell.r][cell.c];

    // you can't open a flagged cell by game rules
    if (cell.hasFlag) return;
    // well this should end the game ... 
    else if (cell.hasMine) {
      console.log('you lost it functionality');
    }
    // here we should open the cell and check for the rest of things
    else if (!cell.isOpen) {
      currentCell.isOpen = true;
      this.setState({ board: [...board] });
    }
  }

  render() {
    return (
      <div className="board">
        {this.state.board.map((row, i) => {
          return <Row key={i} reveal={this.reveal} cells={row} />;
        })}
      </div>
    );
  }
}
