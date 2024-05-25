// The problem presents a two-dimensional array (also called a matrix) of potentially unequal height and width. The matrix is filled with integers. The problem
// also p[resents a positive integer `size`. Write a function which returns the maximum sum which can be generated from a submatrix with dimensions size * size.

// For example, consider the following matrix:

// [
//  [2, 4],
//  [5, 6],
//  [-3, 2],
// ]

// If size = 2, then the 2 x 2 submatrices to consider are:

// [2, 4]
// [5, 6]
// ------
// [5, 6]
// [-3, 2]

// The sum of the elements in the first submatrix is 17, and the sum of the elements in the seconf submatrix is 10. In the example, the function should return 17.
// Note: `size` will always be at least 1, and the dimension of the input matrix will always be at least size * size.

// Sample Input:

// matrix =
// [
//  [5, 3, -1, 5],
//  [-7, 3, 7, 4],
//  [12, 8, 0, 0],
//  [1, -8, -8, 2],
// ]
// size = 2

// Sample Output:

// 18
// comes from the 3, 7, 8, 0 submatrix

// Solution 1:

function maximumSumSubmatrix(matrix, size) {
  let sums = createSumMatrix(matrix);
  let maxSubMatrixSum = -Infinity;

  for (let row = size - 1; row < matrix.length; row++) {
    for (let col = size - 1; col < matrix[row].length; col++) {
      let total = sums[row][col];

      if (row - size >= 0) {
        total -= sums[row - size][col];
      }

      if (col - size >= 0) {
        total -= sums[row][col - size];
      }

      if (row - size >= 0 && col - size >= 0) {
        total += sums[row - size][col - size];
      }

      maxSubMatrixSum = Math.max(maxSubMatrixSum, total);
    }
  }
  return maxSubMatrixSum;
}

function createSumMatrix(matrix) {
  let sums = Array(matrix.length)
    .fill()
    .map(() => Array(matrix[0].length).fill(0));
  sums[0][0] = matrix[0][0];

  for (let idx = 1; idx < matrix[0].length; idx++) {
    sums[0][idx] = sums[0][idx - 1] + matrix[0][idx];
  }

  for (let idx = 1; idx < matrix.length; idx++) {
    sums[idx][0] = sums[idx - 1][0] + matrix[idx][0];
  }

  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[row].length; col++) {
      sums[row][col] =
        sums[row - 1][col] +
        sums[row][col - 1] -
        sums[row - 1][col - 1] +
        matrix[row][col];
    }
  }
  return sums;
}
