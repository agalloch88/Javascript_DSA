// The problem presents a two-dimensional array (also called a matrix), which contains distinct integers, and a target integer. Each row in the matrix is sorted, and
// each column is also sorted. The matrix does not necessarily have the same height and width.

// Write a function which returns an array of the row and column indi9ces of the target integer, if said integer is actually found within the matrix.
// If it is not found, return [-1, -1].

// Sample Input:
// matrix = [
//      [1, 4, 7, 12, 15, 1000],
//      [2, 5, 19, 31, 32, 10001],
//      [3, 8, 24, 33, 35, 1002],
//      [40,, 41, 42, 44, 45, 1003],
//      [99, 100, 103, 106, 128, 1004],         
//     ]
// target = 44

// Sample Output:
// [3, 3]

// Solution 1:

// solution employing binary search-esque technique to discard values higher or lower than target, starting at top right-most value

// O(n + m) time due to at most working through n columns and m rows of values to get target or return [-1, -1]
// O(1) space due to only storing a few variables, no auxiliary data structures

function searchInSortedMatrix(matrix, target) {
    // set coordinates of where at in the matrix for x(row) and y(col)
    let row = 0;
    let col = matrix[0].length - 1;
    // while within the bounds of the matrix, keep searching
    while (row < matrix.length && col >= 0) {
        // if current value at coordinates is bigger than target, any other values in this col will also be larger, so discard rest of col
        if (matrix[row][col] > target) {
            col--;
        // if current value at coordinates is smaller than target, rest of values to the left in this row will also be smaller, so discard rest of row
        } else if (matrix[row][col] < target) {
            row++;
        // if not greater or smaller, must have found value, so return coordinates
        } else {
            return [row, col];
        }
    }
    // if break out of confines of matrix without returning coordinates of value, value must not be in matrix, so return base case
    return [-1, -1];
}