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

// solution employing binary search-esque technique to discard values higher or lower than target

// O(n + m) time due to at most working through n columns and m rows of values to get target or return [-1, -1]
// O(1) space due to only storing a few variables, no auxiliary data structures

function searchInSortedMatrix(matrix, target) {
    let row = 0;
    let col = matrix[0].length - 1;

    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] > target) {
            col--;
        } else if (matrix[row][col] < target) {
            row++;
        } else {
            return [row, col];
        }
    }
    return [-1, -1];
}