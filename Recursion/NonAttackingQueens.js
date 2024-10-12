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

// recursive solution attempting to place queens row by row, checking each placement

// O(n!) time due to factorial complexity of n * (n - 1) * (n - 2)... checks
// O(n) space due to recursive call son the call stack, using array to hold columnPlacements

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

// recursive solution using backtracking and sets to efficiently check placements

// O(n!) time, at worst, helped by efficient Set lookups and backtracking
// O(n) space due to three Set objects of n, where 3n reduces to n

function nonAttackingQueens(n) {
  // Initialize three sets to track blocked columns and diagonals.
  let blockedColumns = new Set(); // Tracks which columns are blocked by existing queens.
  let blockedUpDiagonals = new Set(); // Tracks upward diagonals blocked by queens. Calculated as row + col.
  let blockedDownDiagonals = new Set(); // Tracks downward diagonals blocked by queens. Calculated as row - col.

  // Start the recursive function to find valid queen placements.
  return getNumberOfNonAttackingQueenPlacements(
    0,
    blockedColumns,
    blockedUpDiagonals,
    blockedDownDiagonals,
    n,
  );
}

function getNumberOfNonAttackingQueenPlacements(
  row,
  blockedColumns,
  blockedUpDiagonals,
  blockedDownDiagonals,
  boardSize,
) {
  // Base case: If we've placed queens on all rows, we have a valid solution.
  if (row === boardSize) {
    return 1;
  }

  let validPlacements = 0;

  // Recursive Case
  // Iterate through each column in the current row to try placing a queen.
  for (let col = 0; col < boardSize; col++) {
    // Check if placing a queen in this column is valid (i.e., it does not conflict with other queens).
    if (
      isNonAttackingPlacement(
        row,
        col,
        blockedColumns,
        blockedUpDiagonals,
        blockedDownDiagonals,
      )
    ) {
      // Place the queen and mark the column and diagonals as blocked.
      placeQueen(
        row,
        col,
        blockedColumns,
        blockedUpDiagonals,
        blockedDownDiagonals,
      );

      // Recur to place queens in the next rows.
      validPlacements += getNumberOfNonAttackingQueenPlacements(
        row + 1,
        blockedColumns,
        blockedUpDiagonals,
        blockedDownDiagonals,
        boardSize,
      );

      // Backtrack by removing the queen and unblocking the column and diagonals.
      removeQueen(
        row,
        col,
        blockedColumns,
        blockedUpDiagonals,
        blockedDownDiagonals,
      );
    }
  }

  // Return the total number of valid queen placements found for this configuration.
  return validPlacements;
}

function isNonAttackingPlacement(
  row,
  col,
  blockedColumns,
  blockedUpDiagonals,
  blockedDownDiagonals,
) {
  // Check if this column is blocked.
  if (blockedColumns.has(col)) {
    return false;
  }

  // Check if the upward diagonal (row + col) is blocked.
  if (blockedUpDiagonals.has(row + col)) {
    return false;
  }

  // Check if the downward diagonal (row - col) is blocked.
  if (blockedDownDiagonals.has(row - col)) {
    return false;
  }

  // If the column and both diagonals are free, this is a valid placement.
  return true;
}

function placeQueen(
  row,
  col,
  blockedColumns,
  blockedUpDiagonals,
  blockedDownDiagonals,
) {
  // Block the column and diagonals where the queen was placed.
  blockedColumns.add(col);
  blockedUpDiagonals.add(row + col);
  blockedDownDiagonals.add(row - col);
}

function removeQueen(
  row,
  col,
  blockedColumns,
  blockedUpDiagonals,
  blockedDownDiagonals,
) {
  // Unblock the column and diagonals when the queen is removed (backtracking).
  blockedColumns.delete(col);
  blockedUpDiagonals.delete(row + col);
  blockedDownDiagonals.delete(row - col);
}
