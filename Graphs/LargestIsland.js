// The problem presents a two-dimensional array (also known as a matrix) of potentially unequal height and width. The 2D array/matrix contains only 0's and 1's. Each 1 represents water, and each 0
// represents part of a land mass. A land mass consists of any number of 0's which are either horizontally or vertically adjacent (but not diagonally adjacent). The number of adjacent 0's forming
// a land mass determines its size.

// Note that a land mass may twist and turn. In other words, it does not have to be a straight vertical or horizontal line. It may, in fact, be L-shaped, or some shape more complex.

// Write a function which returns the largest possible land mass size after changing exactly one 1 (water) to one 0 (land). Note that the given 2D array/matrix will always contain at least one 1, and
// the problem allows for mutation of the input 2D array/matrix.

// Sample Input:

// matrix = [
//  [0, 1, 1],
//  [0, 0, 1],
//  [1, 1, 0]
// ]

// Sample Output:

// 5
// Switching either matrix[1][2] or matrix[2][1] creates a land mass of size 5

// Solution 1: