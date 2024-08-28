import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    //Creates array-of-arrays of true/false values
    initialBoard = Array.from({ length: nrows }, () => Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn));
    return initialBoard; 
  }

  function hasWon() {
    //Checks the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Makes a (deep) copy of the oldBoard
      const oldBoardCopy = oldBoard.map(row => [...row]);

      // In the copy, flips this cell and the cells around it
      flipCell(y, x, oldBoardCopy);
      flipCell(y, x - 1, oldBoardCopy);
      flipCell(y, x + 1, oldBoardCopy);
      flipCell(y - 1, x, oldBoardCopy);
      flipCell(y + 1, x, oldBoardCopy);


      //Return the copy
      return oldBoardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>YOU WON!</div>
  }
  //Make table board
  return (
    <table className="Board">
      <tbody>
        {board.map((row, y) => (
          <tr key={y}>
            {row.map((cell, x) => (
              <Cell
                key={`${y}-${x}`}
                isLit={cell}
                flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
Board.defaultProps = {
  nrows: 5,
  ncols: 5, 
  chanceLightStartsOn: 0.25
}

export default Board;
