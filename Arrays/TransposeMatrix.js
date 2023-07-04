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

function transposedMatrix(matrix) {
    let transposedMatrix = [];

    for (let col = 0; col < matrix[0].length; col++) {
        let newRow = [];

        for (let row = 0; row < matrix.length; row++) {
            newRow.push(matrix[row][col]);
        }
        transposedMatrix.push(newRow);
    }
    return transposedMatrix;
}