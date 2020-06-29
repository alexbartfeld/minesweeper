import React, { Component } from "react";
import Row from "../Row";

export default class Board extends Component {
  constructor(props) {
    super();

    this.state = {
      board: this.createBoard(props),
    };

    this.onCellClick = this.onCellClick.bind(this);
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
              // make sure the cell does not have a mine
              if (!cell.hasMine) {
                cell.nearByMines++;
              }
            }
          }
        }
      }
    }
    return board;
  };

  onCellClick(event, cell) {
    let board = this.state.board;

    if (event.shiftKey) { // we're placing flags by holding shift while clicking on a cell
      if (cell.isOpen) return;
      if (cell.hasFlag) { // let's remove a flag if it's already has one
        cell.hasFlag = false;
        this.props.updateFlags(-1);
      } else { // let's place a flag on it if it doesn't have one
        if (this.props.flags > 0) { // make sure you have spare flags first
          cell.hasFlag = true;
          this.props.updateFlags(1);
        }
      }
    }
    // you can't open a flagged cell
    else if (cell.hasFlag) return;
    // well this should end the game ... 
    else if (cell.hasMine) {
      this.props.endGame();
    }
    // here we should open the cells
    else if (!cell.isOpen) {
      board = this.openAdjacentCells(cell, board);
    }

    this.setState({ board: [...board] });
  }

  openAdjacentCells(startCell, board) {
    const stack = [];
    const bLength = board.length;
    const rLength = board[0].length;
    ((location) => {
      stack.push(location);
      while (stack.length) {
        const l = stack.pop();
        const r = l[0];
        const c = l[1];
        // check that the location is in board limits
        if (c < 0 || r < 0 || c > rLength - 1 || r > bLength - 1) {
          continue;
        }
        const cell = board[r][c];
        if (cell.isOpen) {
          continue;
        }
        cell.isOpen = true;
        if (cell.nearByMines > 0) {
          continue;
        }
        // top
        stack.push([r - 1, c]);
        // top-left
        stack.push([r - 1, c - 1]);
        //top-right
        stack.push([r - 1, c + 1]);
        // left
        stack.push([r, c - 1]);
        // right
        stack.push([r, c + 1]);
        // bottom
        stack.push([r + 1, c]);
        // bottom-left
        stack.push([r + 1, c - 1]);
        // bottom-right
        stack.push([r + 1, c + 1]);
      }
    })([startCell.r, startCell.c]);
    return board;
  }

  render() {
    return (
      <div className="board">
        {this.state.board.map((row, i) => {
          return <Row key={i} onCellClick={this.onCellClick} cells={row} />;
        })}
      </div>
    );
  }
}
