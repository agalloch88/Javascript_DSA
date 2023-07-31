// Minesweeper is a popular game, made famous on early versions of the Windows OS. From Wikipedia, "The game features a grid of clickable squares, with hidden 'mines' scattered throughout the board.
// The objective is to clear the board without detonating any mines, with help from clues about the number of neighboring mines in each field." Specifically, when a player clicks on a square (also called a cell),
// which does not contain a mine, the cell reveals a number representing the number of immediately adjacent mines, including those diagonally-adjacent to the current cell.

// The problem presents a two-dimensional array of strings, which represent a Minesweeper board for an in-progress game. The problem also presents a row and a column representing the indices of the next square
// which the player clicks on the board. Write a function which returns an updated board after the click (the function may mutate the input board).

// The board will always contain only strings, and each string will be one of the following:

// * "M": A mine which has not been clicked on.
// * "X": A mine which has been clicked on, indicating a lost game.
// * "H": A cell containing no mine, but whose content is still hidden from the player.
// * "0 - 8": A cell with no mine, but with an integer from 0 to 8 representing the number of adjacent mines. Note that this is a single-digit integer represented as a string. For example, "2"
// *          would indicate there are 2 adjecent cells with mines. Numbered cells are not clickable, as they are already revealed.

// If a player clicks on a mine, replace the "M" with "X", indicating the game was lost.
// If a player clicks on a cell adjacent to a mine, replace the "H" with a string representing the number of adjacent mines.
// If a player clicks on a cell with no adjacent mines, replace the "H" with "0". Additionally, reveal all of the adjacent hidden mines as if the player has clicked on those cells as well.
// For the purposes of the problem, assume the given row and column always represents a legal move. The board may be of any size, and have any number of mines in it.

// Sample Input #1:

// board = [
//  ["M", "M"],
//  ["H", "H"],
//  ["H", "H"]
// ]

// row = 2
// column = 0

// Sample Output #1:

// [
//  ["M", "M"],
//  ["2", "2"],
//  ["0", "0"]
// ]

// Sample Input #2:

// board = [
//  ["H", "H", "H", "H", "M"],
//  ["H", "1", "M", "H", "1"],
//  ["H", "H", "H", "H", "H"],
//  ["H", "H", "H", "H", "H"],
// ]

// row = 3
// column = 4

// Sample Output #2:

// [
//  ["0", "1", "H", "H", "M"],
//  ["0", "1", "M", "2", "1"],
//  ["0", "1", "1", "1", "0"],
//  ["0", "0", "0", "0", "0"],
// ]

// Solution 1:

// recursive solution getting neghbors and tracking adjacent mine counts to determine which H squares can be revealed

// O(w * h) time, where w is the width and h is the height of the matrix, which ultimately converges to n inputs from the board
// O(w * h) space, where w is the width and h is the height of the matrix, which is ultimately n, as may have as many calls on call stack as inputs in the board

// main function, which takes in the input board, as well as a row and column coordinate pair of a given move
function revealMinesweeper(board, row, column) {
  // if the coordinates of row and column on the board are equal to M, or a mine position, execute below
  if (board[row][column] === "M") {
    // in this case, change the M to an X
    board[row][column] = "X";
    // the player has lost the game by picking a mine position, so simply return the board in it's current state and that's it
    return board;
  }
  // for moves other than an M position, need to get the neighbors of the coordinate pair, so initialize variable neighbors and set equal to return value from getNeighbors helper, passing in input params
  let neighbors = getNeighbors(board, row, column);
  // initialize variable adjacentMineCount and set equal to 0
  let adjacentMineCount = 0;
  // iterate over all the results in neighbors, destructuring each coordinate pair into neighborRow and neighborColumn
  for (let [neighborRow, neighborColumn] of neighbors) {
    // if the value on the board at these neighbor coordinates is an M, this is a mine, so increment adjacentMineCount by 1
    if (board[neighborRow][neighborColumn] === "M") {
      adjacentMineCount++;
    }
  }
  // if adjacentMineCount is greater than 0, there are mines which should be accounted for at this initial input coordinate pair
  if (adjacentMineCount > 0) {
    // convert the value at input coordinates to the stringified value of adjacentMineCount
    board[row][column] = adjacentMineCount.toString();
    // if adjacentMineCount is 0, then execute below
  } else {
    // set value at initial input coordinates to 0
    board[row][column] = "0";
    // now, check every neighbor of this position to see if any others need to be changed as well, iterating over every neighbor in neighbors and destructuring the neighborRow and neighborColumn
    // from the coordinates
    for (let [neighborRow, neighborColumn] of neighbors) {
      // if the value at the given neighbor coordinates is also an H, then recursively call revealMinesweeper on this position
      if (board[neighborRow][neighborColumn] === "H") {
        revealMinesweeper(board, neighborRow, neighborColumn);
      }
    }
  }
  // once all possible neighbors are checked, return the final board
  return board;
}

// helper function to find the neighbors of given coordinates, which takes in all the main function input parameters
function getNeighbors(board, row, column) {
  // need to establish the directions being looked in, so initialize variable directions and set equal to an array of coordinates: up, down, left, right, as well as all the diagonals
  let directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  // initialize variable neighbors, and set equal to an empty array
  // this will hold all the found neighbors of the given coordinates
  let neighbors = [];
  // iterate over every possibility in directions, destructuring the directionRow and directionColumn from those coordinate pairs
  for (let [directionRow, directionColumn] of directions) {
    // initialize variable newRow and set equal to the value of the current row plus the value of directionRow
    let newRow = row + directionRow;
    // initialize variable newColumn and set equal to the value of the current column plus the value of directionColumn
    let newColumn = column + directionColumn;
    // if the newRow and newColumn coordinate pair is in bounds of the row and column parameters of the input board, then push the value at that coordinate into the neighbors array
    if (
      0 <= newRow &&
      newRow < board.length &&
      0 <= newColumn &&
      newColumn < board[0].length
    ) {
      neighbors.push([newRow, newColumn]);
    }
  }
  // once looped over all possible directions, return the resulting neighbors found
  return neighbors;
}

// Solution 2:

function revealMinesweeper(board, row, column) {
  if (board[row][column] === "M") {
    board[row][column] = "X";
    return board;
  }

  let numOfMines = 0;
  let rowStart = Math.max(row - 1, 0);
  let rowEnd = Math.min(row + 1, board.length - 1);
  let columnStart = Math.max(column - 1, 0);
  let columnEnd = Math.min(column + 1, board[0].length - 1);

  for (let i = rowStart; i <= rowEnd; i++) {
    for (let j = columnStart; j <= columnEnd; j++) {
      if (board[i][j] === "M") {
        numOfMines++;
      }
    }
  }
  board[row][column] = String(numOfMines);
  if (numOfMines === 0) {
    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = columnStart; j <= columnEnd; j++) {
        if (board[i][j] === "H") {
          revealMinesweeper(board, i, j);
        }
      }
    }
  }
  return board;
}
