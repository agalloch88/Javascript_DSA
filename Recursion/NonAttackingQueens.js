// Write a function which takes in a positive integer, `n`, and returns the number of non-attacking placements of `n` queens on a `n x n` chessboard.

// A non-attacking placement is one where no queen can attack another queen in a single turn. In other words, it is a placement whereby no queen
// can move to the same position as another queen in a signle turn.

// In chess, queens can move any number of squares horizontally, vertically, or diagonally in a single turn.

// +--+--+--+--+
// |  |Q |  |  |
// +--+--+--+--+
// |  |  |  |Q |
// +--+--+--+--+
// |Q |  |  |  |
// +--+--+--+--+
// |  |  |Q |  |
// +--+--+--+--+

// The chessboard above is an example of a non-attacking placement of 4 queens on a 4 x 4 chessboard. For reference, there are only 2 non-attacking placements of
// 4 queens on a 4 x 4 chessboard.

// Sample Input:

// n = 4

// Sample Output:

// 2

// Solution 1:

function nonAttackingQueens(n) {
  // Create an array to hold the column placements of queens. Initially, all columns are 0.
  let columnPlacements = new Array(n).fill(0);

  // Start the recursive function to calculate the number of valid placements.
  return getNumberOfNonAttackingQueenPlacements(0, columnPlacements, n);
}

function getNumberOfNonAttackingQueenPlacements(
  row,
  columnPlacements,
  boardSize,
) {
  // Base case: If we've placed queens in all rows, we have a valid solution.
  if (row === boardSize) {
    return 1;
  }

  let validPlacements = 0;

  // Try placing the queen in every column of the current row.
  for (let col = 0; col < boardSize; col++) {
    // Check if placing the queen in this column leads to a non-attacking configuration.
    if (isNonAttackingPlacement(row, col, columnPlacements)) {
      // Place the queen in the current column.
      columnPlacements[row] = col;

      // Recur to place queens in the next rows and add up valid placements.
      validPlacements += getNumberOfNonAttackingQueenPlacements(
        row + 1,
        columnPlacements,
        boardSize,
      );
    }
  }

  // Return the total number of valid queen placements for this configuration.
  return validPlacements;
}

function isNonAttackingPlacement(row, col, columnPlacements) {
  // Check all previous rows to ensure no queens are attacking the new one.
  for (let previousRow = 0; previousRow < row; previousRow++) {
    let columnToCheck = columnPlacements[previousRow];

    // Check if any queen is in the same column.
    let sameColumn = columnToCheck === col;

    // Check if any queen is on the same diagonal.
    let onDiagonal = Math.abs(columnToCheck - col) === row - previousRow;

    // If the new queen is in the same column or diagonal as a previous one, it's an invalid placement.
    if (sameColumn || onDiagonal) {
      return false;
    }
  }

  // If no queen attacks the new one, return true.
  return true;
}

// Solution 2:

function nonAttackingQueens(n) {
  let blockedColumns = new Set();
  let blockedUpDiagonals = new Set();
  let blockedDownDiagonals = new Set();
  return getNumberOfNonAttackingQueenPlacements(0, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, n);
}

function getNumberOfNonAttackingQueenPlacements(row, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, boardSize) {
  if (row === boardSize) {
    return 1;
  }

  let validPlacements = 0;
  for (let col = 0; col < boardSize; col++) {
    if (isNonAttackingPlacement(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals)) {
      placeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals);
      validPlacements += getNumberOfNonAttackingQueenPlacements(row + 1, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, boardSize);
      removeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals);
    }
  }

  return validPlacements;
}

function isNonAttackingPlacement(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals) {
  if (blockedColumns.has(col)) {
    return false;
  }

  if (blockedUpDiagonals.has(row + col)) {
    return false;
  }

  if (blockedDownDiagonals.has(row - col)) {
    return false;
  }

  return true;
}

function placeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals) {
  blockedColumns.add(col);
  blockedUpDiagonals.add(row + col);
  blockedDownDiagonals.add(row - col);
}

function removeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals) {
  blockedColumns.delete(col);
  blockedUpDiagonals.delete(row + col);
  blockedDownDiagonals.delete(row - col);
}