// The problem presents a two-dimensional array (aka a matrix) of potentially unequal height and width, which contains only 0s and 1's. The matrix represents a two-toned image,
// where each 1 represents black and each 0 represents white. An island is defined as any number of 1's which are horizontally or vertically adjacent (but not diagonally adjacent)
// and which don't touch the border of the image. In other words, a gorup of horizontally or vertically adjacent 1's is not considered an island if any of those 1's
// are in the first row, last row, first column, or last column of the input matrix.

// Note that an island can twist. In other words, it does not have to be a straight vertical line or straight horizontal line. It can be L or T-shaped, for example.

// Islands may be conceptualized as patches of black which do not touch the border of the two-toned image.

// For this problem, write a function which returns a modified version of the input matrix, in which all of the islands present in the initial input are removed. Islands
// may be removed by replacing the 1's with 0's.

// Given this requirement, naturally, the input matrix is mutable and may be modified.

// Sample Input:
// matrix = 
// [
//  [1, 0, 0, 0, 0, 0],
//  [0, 1, 0, 1, 1, 1],
//  [0, 0, 1, 0, 1, 0],
//  [1, 1, 0, 0, 1, 0],
//  [1, 0, 1, 1, 0, 0],
//  [1, 0, 0, 0, 0, 1],
// ]

// Sample Output:
// matrix = 
// [
//  [1, 0, 0, 0, 0, 0],
//  [0, 0, 0, 1, 1, 1],
//  [0, 0, 0, 0, 1, 0],
//  [1, 1, 0, 0, 1, 0],
//  [1, 0, 0, 0, 0, 0],
//  [1, 0, 0, 0, 0, 1],
// ]

// Solution 1: