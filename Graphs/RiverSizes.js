// The problem presents a two-dimensional array (also known as a matrix), which may potentially be unequal in terms of height and width, and contains only 0's and 1's.
// Each 0 represents land, and each 1 represents a stretch of river. A river consisters of any number of 1's strung consecutively, either horizontally or vertically adjacent, 
// but not diagonally adjacent. The number of adjacent 1's forming a river determine the river's size.

// Note that a river can twist. In other words, it does not have to be a straight vertical line, or a straight horizontal line. It can be L-shaped, or T-shaped, for example.

// Write a function which returns an array of the sizes of all rivers represented/found in the input matrix. The sizes do not need to be in any particular order.

// Sample Input:
// matrix = [
//  [1, 0, 0, 1, 0],
//  [1. 0, 1, 0, 0],
//  [0, 0, 1, 0, 1],
//  [1, 0, 1, 0, 1],
//  [1, 0, 1, 1, 0],   
// ]

// Sample Output:
// [1, 2, 2, 2, 5], but the numbers may be ordered differently.

// Solution 1: