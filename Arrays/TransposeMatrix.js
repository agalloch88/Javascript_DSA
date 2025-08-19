// The problem presents a 2D array of integers, also known as a matrix. Write a function which
// returns the transpose of the matrix.

// The transpose of a matrix is a flipped version of the original matrix, where it is flipped
// across its main diagonal (which runs from top-left to bottom-right). The "transpose" switches
// the row and column indices of the original matrix.

// For the purposes of the problem, assume the input matrix always has at least 1 value. However,
// the width and height are not necessarily the same.

// Sample Input #1:

// matrix = [
//  [1, 2],
// ]

// Sample Output #1:

// [
//  [1],
//  [2]
// ]

// Sample Output #2:

// matrix = [
//  [1, 2],
//  [3, 4],
//  [5, 6]
// ]

// Sample Output #2:

// [
//  [1, 3, 5],
//  [2, 4, 6]
// ]

// Sample Output #3:

// matrix = [
//  [1, 2, 3],
//  [4, 5, 6],
//  [7, 8, 9]
// ]

// Sample Output #3:

// [
//  [1, 4, 7],
//  [2, 5, 8],
//  [3, 6, 9]
// ]

// Solution 1:

// iterative solution flipping matrix columns to rows across diagonal axis

// O(w * h) time due to going over w rows and h columns in original matrix
// O(w * h) space due to storing a copy of w rows and h columns for new matrix

function transposedMatrix(matrix) {
  // initialize variable transposedMatrix and set equal to empty array
  let transposedMatrix = [];
  // iterate over the columns
  for (let col = 0; col < matrix[0].length; col++) {
    // initialize variable newRow and set equal to empty array
    let newRow = [];
    // iterate over the rows for each column
    for (let row = 0; row < matrix.length; row++) {
      // push the value at row/col intersection in the matrix into the newRow array
      newRow.push(matrix[row][col]);
    }
    // push each newRow array into the transposedArray array to build the new matrix
    transposedMatrix.push(newRow);
  }
  // once finished with all columns, return the finished transposedMatrix
  return transposedMatrix;
}

// Solution 2:

// one-loop solution using dimensions of matrix and count to figure out when done transposing

function transposedMatrix2(matrix) {
  // initialize variable transposedMatrix and set equal to empty array
  let transposedMatrix = [];
  // initialize variable total and set equal to the dimensions of the matrix
  let total = matrix.length * matrix[0].length;
  // initialize variables i and j, setting both equal to 0
  // these variables will function as the coordinate pointers when moving through the matrix
  let i = 0;
  let j = 0;
  // initialize variable count and set equal to 0
  let count = 0;
  // keep looping while count is smaller than the total
  while (count < total) {
    // if there is not a value at position j in transposedMatrix, then set the value equal to an empty array, so a new row in the matrix
    if (!transposedMatrix[j]) {
      transposedMatrix[j] = [];
    }
    // push the value at the i,j coordinates in input matrix into the transposedMatrix at position j
    transposedMatrix[j].push(matrix[i][j]);
    // increment j by 1, moving this pointer along its current row to the right
    j++;
    // j is equal to the length of the row, hit the end, so need to reset
    if (j === matrix[0].length) {
      // increment i by 1, moving over to the next column
      i++;
      // reset j equal to 0
      j = 0;
    }
    // increment count by 1
    count++;
  }
  // once while loop breaks, should be done transposing the matrix, so return the new transposedMatrix
  return transposedMatrix;
}
