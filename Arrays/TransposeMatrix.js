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

function transposedMatrix(matrix) {
    let transposedMatrix = [];
    let total = matrix.length * matrix[0].length;
    let i = 0;
    let j = 0;
    let count = 0;

    while (count < total) {
        if (!transposedMatrix[j]) {
            transposedMatrix[j] = [];
        }

        transposedMatrix[j].push(matrix[i][j]);
        j++;

        if (j === matrix[0].length) {
            i++;
            j = 0;
        }

        count++;
    }
    return transposedMatrix;
}