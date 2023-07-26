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