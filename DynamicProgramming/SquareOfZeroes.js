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

// dynamic programming solution using iterative approach to improve space complexity

// O(n^4) time due to nested for loops and all n^2 potential squares
// O(1) space since not storing anything other than a few variables

function squareOfZeroes(matrix) {
  let n = matrix.length; // Dimension of the matrix

  // Iterate through all possible top-left corners of squares
  for (let topRow = 0; topRow < n; topRow++) {
    for (let leftCol = 0; leftCol < n; leftCol++) {
      let squareLength = 2; // Start with the smallest possible square (2x2)

      // Expand the square size while staying within matrix bounds
      while (squareLength <= n - leftCol && squareLength <= n - topRow) {
        let bottomRow = topRow + squareLength - 1; // Bottom boundary of the square
        let rightCol = leftCol + squareLength - 1; // Right boundary of the square

        // Check if the current square is made entirely of zeroes
        if (isSquareOfZeroes(matrix, topRow, leftCol, bottomRow, rightCol)) {
          return true; // Return true if a square of zeroes is found
        }

        squareLength++; // Increment square size
      }
    }
  }
  return false; // Return false if no square of zeroes is found
}

function isSquareOfZeroes(matrix, r1, c1, r2, c2) {
  // Check all rows on the left and right borders of the square
  for (let row = r1; row < r2 + 1; row++) {
    if (matrix[row][c1] !== 0 || matrix[row][c2] !== 0) {
      return false; // Return false if any border element is not zero
    }
  }

  // Check all columns on the top and bottom borders of the square
  for (let col = c1; col < c2 + 1; col++) {
    if (matrix[r1][col] !== 0 || matrix[r2][col] !== 0) {
      return false; // Return false if any border element is not zero
    }
  }

  return true; // Return true if all borders are zero
}

// Solution 3:

// dynamic programming solution precomputing the matrix values and enabling constant time lookups of 0's by using recursive decomposition and caching

// O(n^3) time due to iterating over all n^2 cells of matrix and recurisve decomposition
// O(n^3) space due to storing the infoMatrix, caching, and the recursive call stack

function squareOfZeroes(matrix) {
  // Precompute information about contiguous zero counts in the matrix
  let infoMatrix = preComputeNumOfZeroes(matrix);
  let lastIdx = matrix.length - 1;

  // Check if any square of zeroes exists using the precomputed information
  return hasSquareOfZeroes(infoMatrix, 0, 0, lastIdx, lastIdx, {});
}

function hasSquareOfZeroes(infoMatrix, r1, c1, r2, c2, cache) {
  // Base case: If the square becomes invalid (non-square), return false
  if (r1 >= r2 || c1 >= c2) {
    return false;
  }

  // Generate a unique key for the current subproblem
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

  // Check if the current region is a square of zeroes or recursively check smaller squares
  cache[key] =
    isSquareOfZeroes(infoMatrix, r1, c1, r2, c2) ||
    hasSquareOfZeroes(infoMatrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) || // Inner square
    hasSquareOfZeroes(infoMatrix, r1, c1 + 1, r2 - 1, c2, cache) || // Top-left to bottom-right diagonal reduction
    hasSquareOfZeroes(infoMatrix, r1 + 1, c1, r2, c2 - 1, cache) || // Bottom-left to top-right diagonal reduction
    hasSquareOfZeroes(infoMatrix, r1 + 1, c1 + 1, r2, c2, cache) || // Trim top-left
    hasSquareOfZeroes(infoMatrix, r1, c1, r2 - 1, c2 - 1, cache); // Trim bottom-right

  return cache[key];
}

function isSquareOfZeroes(infoMatrix, r1, c1, r2, c2) {
  let squareLength = c2 - c1 + 1; // Length of the square's side

  // Check if all borders of the square have enough contiguous zeroes
  let hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength;
  let hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength;
  let hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength;
  let hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength;

  return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder;
}

function preComputeNumOfZeroes(matrix) {
  // Create a matrix to store the number of contiguous zeroes below and to the right of each cell
  let infoMatrix = matrix.map((row) =>
    row.map((value) => {
      let numZeroes = value === 0 ? 1 : 0;
      return { numZeroesBelow: numZeroes, numZeroesRight: numZeroes };
    }),
  );

  let lastIdx = matrix.length - 1;

  // Populate the infoMatrix with contiguous zero counts
  for (let row = lastIdx; row >= 0; row--) {
    for (let col = lastIdx; col >= 0; col--) {
      // Skip cells with a value of 1
      if (matrix[row][col] === 1) {
        continue;
      }

      // Accumulate counts from the cell below and to the right
      if (row < lastIdx) {
        infoMatrix[row][col].numZeroesBelow +=
          infoMatrix[row + 1][col].numZeroesBelow;
      }
      if (col < lastIdx) {
        infoMatrix[row][col].numZeroesRight +=
          infoMatrix[row][col + 1].numZeroesRight;
      }
    }
  }
  return infoMatrix;
}
