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
