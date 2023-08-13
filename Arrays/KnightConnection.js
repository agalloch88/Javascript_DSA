// The problem presents the position of two knight pieces on an infinite chess board. Write a function which returns the minimum number of turns required before one of the knights is able to capture the other knight,
// assuming the knights are working together to achieve this goal.

// The position of each knight is given as a list of two values, those being the x and y coordinates on the board. A knight can make 1 of 8 possible moves during any given turn. Each of these moves
// involves moving in an "L" shape. This means a knight can either move 2 squares horizontally and 1 square vertically, or 2 squares vertically and 1 square horizontally. For example, if a knight
// is currently at position [0, 0], then it can move to any of the following 8 locations during it's next move:

// [[-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1]]

// A knight is able to capture the other knight when it is able to move onto the square currently occupied by the other knight.

// Each turn allows each knight to move up to  one time. For example, if both knights moved toward each other once, and then knightA captures knightB on its next move, two turns would therefore be used,
// even though knightB never made a second move.

// Sample Input:

// knightA = [0, 0]
// knightB = [4, 2]

// Sample Output:

// 1
// knightA moves to [2, 1], and then knightB captures knightA on [2, 1]

// Solution 1: