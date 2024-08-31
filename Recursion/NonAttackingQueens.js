// Write a function which takes in a positive integer, `n`, and returns the number of non-attacking placements of `n` queens on a `n x n` chessboard.

// A non-attacking placement is one where no queen can attack another queen in a single turn. In other words, it is a placement whereby no queen
// can move to the same position as another queen in a signle turn.

// In chess, queens can move any number of squares horizontally, vertically, or diagonally in a single turn.

// +--+--+--+--+
// |  |Q |  |  |
// +--+--+--+--+
// |  |  |  |Q |
// +--+--+--+--+
// |Q |  |  |  |
// +--+--+--+--+
// |  |  |Q |  |
// +--+--+--+--+

// The chessboard above is an example of a non-attacking placement of 4 queens on a 4 x 4 chessboard. For reference, there are only 2 non-attacking placements of 
// 4 queens on a 4 x 4 chessboard.

// Sample Input:

// n = 4

// Sample Output:

// 2

// Solution 1: