// The problem presents a two-dimensional array which represents a 9x9, partially-filled Sudoku board. Write a function which returns the solved Sudoku board.

// Sudoku is a famous number-placement puzzle in which players need to fill a 9x9 grid with integers in the range of 1 to 9. Each 9x9 Sudoku board is further split
// into 9 individual 3x3 subgrids, as seen in the example below, and starts out partially-filled.

// - - 3 | - 2 - | 6 - -
// 9 - - | 3 - 5 | - - 1
// - - 1 | 8 - 6 | 4 - -
// - - - - - - - - - - -
// - - 8 | 1 - 2 | 9 - -
// 7 - - | - - - | - - 8
// - - 6 | 7 - 8 | 2 - -
// - - - - - - - - - - -
// - - 2 | 6 - 9 | 5 - -
// 8 - - | 2 - 3 | - - 9
// - - 5 | - 1 - | 3 - -

// The objective is to fill the grid such that each row, column, and 3x3 subgrid contains the numbers 1 to 9 exactly once. In other words, no row may contain the same
// digit more than once, no column may contain the same digit more than once, and none of the 9 individual 3x3 subgrids may contain the same digit more than once.

// The input for this problem will always be a partially-filled 9x9 two-dimensional array which represents a solvable Sudoku puzzle. Every element in the array will
// be an integer in the range of 0 to 9, where a 0 represents an empty square which must be filled in by the solution algorithm.

// Note that, for the purposes of the problem, it is allowable to modify the input array, and that there will always be exactly one solution to each input Sudoku board.

// Sample Input:

// board = [
//     [7, 8, 0, 4, 0, 0, 1, 2, 0],
//     [6, 0, 0, 0, 7, 5, 0, 0, 9],
//     [0, 0, 0, 6, 0, 1, 0, 7, 8],
//     [0, 0, 7, 0, 4, 0, 2, 6, 0],
//     [0, 0, 1, 0, 5, 0, 9, 3, 0],
//     [9, 0, 4, 0, 6, 0, 0, 0, 5],
//     [0, 7, 0, 3, 0, 0, 0, 1, 2],
//     [1, 2, 0, 0, 0, 7, 4, 0, 0],
//     [0, 4, 9, 2, 0, 6, 0, 0, 7],
// ]

// Sample Output:

// [
//     [7, 8, 5, 4, 3, 9, 1, 2, 6],
//     [6, 1, 2, 8, 7, 5, 3, 4, 9],
//     [4, 9, 3, 6, 2, 1, 5, 7, 8],
//     [8, 5, 7, 9, 4, 3, 2, 6, 1],
//     [2, 6, 1, 7, 5, 8, 9, 3, 4],
//     [9, 3, 4, 1, 6, 2, 7, 8, 5],
//     [5, 7, 8, 3, 9, 4, 6, 1, 2],
//     [1, 2, 6, 5, 8, 7, 4, 9, 3],
//     [3, 4, 9, 2, 1, 6, 8, 5, 7],
// ]

// Solution 1:

function solveSudoku(board) {
    solvePartialSudoku(0, 0, board);
    return board;
}

function solvePartialSudoku(row, col, board) {
    let currentRow = row;
    let currentCol = col;

    if (currentCol === board[currentRow].length) {
        currentRow++;
        currentCol = 0;

        if (currentRow === board.length) {
            return true;
        }
    }

    if (board[currentRow][currentCol] === 0) {
        return tryDigitsAtPosition(currentRow, currentCol, board);
    }
    return solvePartialSudoku(currentRow, currentCol + 1, board);
}

function tryDigitsAtPosition(row, col, board) {
    for (let digit = 1; digit < 10; digit++) {
        if (isValidAtPosition(digit, row, col, board)) {
            board[row][col] = digit;

            if (solvePartialSudoku(row, col + 1, board)) {
                return true;
            }
        }
    }

    board[row][col] = 0;
    return false;
}

function isValidAtPosition(value, row, col, board) {
    let rowIsValid = !board[row].includes(value);
    let colIsValid = !board.map(row => row[col]).includes(value);

    if (!rowIsValid || !colIsValid) {
        return false;
    }

    let subgridRowStart = Math.floor(row / 3) * 3;
    let subgridColStart = Math.floor(col / 3) * 3;

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
        for (let colIdx = 0; colIdx < 3; colIdx++) {
            let rowToCheck = subgridRowStart + rowIdx;
            let coldToCheck = subgridColStart + colIdx;
            let existingValue = board[rowToCheck][coldToCheck];

            if (existingValue === value) {
                return false;
            }
        }
    }
    return true;
}