// Write a function which takes in a square-shaped `n x ` two-dimensional array of only 1's and 0's, and which returns a boolean representing whether the input matrix contains a square
// whose borders are made up of only 0's.

// Note that a `1 x 1` square does not count as a valid square for the purposes of the question. In other words, a singular `0` in the input matrix does not constitute
// a square whose borders are made up of only 0's. A square of 0's has to be at least `2 x 2`.

// Sample Input:

// matrix = [
//    [1, 1, 1, 0, 1, 0],
//    [0, 0, 0, 0, 0, 1],
//    [0, 1, 1, 1, 0, 1],
//    [0, 0, 0, 1, 0, 1],
//    [0, 1, 1, 1, 0, 1],
//    [0, 0, 0, 0, 0, 1],
// ]

// Sample Output:
// true

// [
//    [, , , , ,      ],
//    [0, 0, 0, 0, 0, ],
//    [0,    , , , 0, ],
//    [0, ,   , ,  0, ],
//    [0, , , ,    0, ],
//    [0, 0, 0, 0, 0, ],
// ]

// Solution 1:

// dynamic programming approach to recursively test smaller submatrices for square of 0's, caching the results of already-checked submatrices

// O(n^4) time due to having n^2 submatrices, and running another n^2 checks on these submatrices recursively
// O(n^3) space due to storing cached submatrices

function squareOfZeroes(matrix) {
  // Start from the entire matrix and check if there is any square of zeroes
  let lastIdx = matrix.length - 1;
  return hasSquareOfZeroes(matrix, 0, 0, lastIdx, lastIdx, {});
}

function hasSquareOfZeroes(matrix, r1, c1, r2, c2, cache) {
  // Base case: If the square becomes invalid (non-square), return false
  if (r1 >= r2 || c1 >= c2) {
    return false;
  }

  // Create a unique key for the current subproblem
  let key =
    r1.toString() +
    '-' +
    c1.toString() +
    '-' +
    r2.toString() +
    '-' +
    c2.toString();

  // Return cached result if it exists
  if (key in cache) {
    return cache[key];
  }

  // Check if the current region is a square of zeroes
  // or recursively check smaller squares by reducing dimensions
  cache[key] =
    isSquareOfZeroes(matrix, r1, c1, r2, c2) ||
    hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) || // Inner square
    hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache) || // Top-left to bottom-right diagonal reduction
    hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache) || // Bottom-left to top-right diagonal reduction
    hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache) || // Trim top-left
    hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache); // Trim bottom-right

  // Cache and return result
  return cache[key];
}

function isSquareOfZeroes(matrix, r1, c1, r2, c2) {
  // Check all rows on the left and right borders of the square
  for (let row = r1; row < r2 + 1; row++) {
    if (matrix[row][c1] !== 0 || matrix[row][c2] !== 0) {
      return false;
    }
  }

  // Check all columns on the top and bottom borders of the square
  for (let col = c1; col < c2 + 1; col++) {
    if (matrix[r1][col] !== 0 || matrix[r2][col] !== 0) {
      return false;
    }
  }

  // If all borders are zeroes, it's a valid square
  return true;
}

// Solution 2:

function squareOfZeroes(matrix) {
  let n = matrix.length;

  for (let topRow = 0; topRow < n; topRow++) {
    for (let leftCol = 0; leftCol < n; leftCol++) {
      let squareLength = 2;

      while (squareLength <= n - leftCol && squareLength <= n - topRow) {
        let bottomRow = topRow + squareLength - 1;
        let rightCol = leftCol + squareLength - 1;

        if (isSquareOfZeroes(matrix, topRow, leftCol, bottomRow, rightCol)) {
          return true;
        }

        squareLength++;
      }
    }
  }
  return false;
}

function isSquareOfZeroes(matrix, r1, c1, r2, c2) {
    for (let row = r1; row < r2 + 1; row++) {
        if (matrix[row][c1] !== 0 || matrix[row][c2] !== 0) {
            return false;
        }
    }

    for (let col = c1; col < c2 + 1; col++) {
        if (matrix[r1][col] !== 0 || matrix[r2][col] !== 0) {
            return false;
        }
    }

    return true;
}