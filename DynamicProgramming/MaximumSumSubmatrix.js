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

// Time Complexity:
// The createSumMatrix function runs in O(n*m) time, where n is the number of rows and m is the number of columns in the matrix.
// The maximumSumSubmatrix function also runs in O(n*m) time as it iterates over the entire matrix to calculate the submatrix sums.

// Space Complexity:
// The space complexity is O(n*m) due to the storage of the summed area table.

function maximumSumSubmatrix(matrix, size) {
  // Create a summed area table for the given matrix
  let sums = createSumMatrix(matrix);
  let maxSubMatrixSum = -Infinity;

  // Iterate through each possible bottom-right corner of the submatrices of the given size
  for (let row = size - 1; row < matrix.length; row++) {
    for (let col = size - 1; col < matrix[row].length; col++) {
      // Calculate the sum of the current submatrix using the summed area table
      let total = sums[row][col];

      // Subtract the sum of the area above the submatrix if it exists
      if (row - size >= 0) {
        total -= sums[row - size][col];
      }

      // Subtract the sum of the area to the left of the submatrix if it exists
      if (col - size >= 0) {
        total -= sums[row][col - size];
      }

      // Add the sum of the overlapping area (top-left of the submatrix) if both subtractions were done
      if (row - size >= 0 && col - size >= 0) {
        total += sums[row - size][col - size];
      }

      // Update the maximum submatrix sum found so far
      maxSubMatrixSum = Math.max(maxSubMatrixSum, total);
    }
  }
  return maxSubMatrixSum;
}

function createSumMatrix(matrix) {
  // Initialize the summed area table with the same dimensions as the input matrix
  let sums = Array(matrix.length)
    .fill()
    .map(() => Array(matrix[0].length).fill(0));

  // Set the value of the top-left cell
  sums[0][0] = matrix[0][0];

  // Fill the first row of the summed area table
  for (let idx = 1; idx < matrix[0].length; idx++) {
    sums[0][idx] = sums[0][idx - 1] + matrix[0][idx];
  }

  // Fill the first column of the summed area table
  for (let idx = 1; idx < matrix.length; idx++) {
    sums[idx][0] = sums[idx - 1][0] + matrix[idx][0];
  }

  // Fill the rest of the summed area table
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[row].length; col++) {
      // Each cell is calculated as the sum of the current cell in the matrix,
      // the sum above it, the sum to the left of it, minus the overlapping top-left area
      sums[row][col] =
        sums[row - 1][col] +
        sums[row][col - 1] -
        sums[row - 1][col - 1] +
        matrix[row][col];
    }
  }
  return sums;
}
