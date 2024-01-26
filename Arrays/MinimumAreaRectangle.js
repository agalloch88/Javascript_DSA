// The problem presents an array/lisst of points/coordinates plotted on a 2D graph (meaning, the x/y plane). Write a function which returns the minimum area of any rectangle which can be formed
// using any 4 of these points/coordinates such that the rectangle's sides are parallel to the x and y axes (meaning, only rectangles with horizontal and vertical sides should be considered, and no
//  shapes with diagonal sides are considered). If no rectangle can be formed adhering to these requirements, the function should return 0.

// The input array/list will contain points/coordinated represented by arrays/lists of two integers [x, y]. The input array/list will never contain duplicate points/coordinates.

// Sample Input:

// points = [
//  [1, 5],
//  [5, 1],
//  [4, 2],
//  [2, 4],
//  [2, 2],
//  [1, 2],
//  [4, 5],
//  [2, 5],
//  [-1, -2],
// ]

// Sample Output:

// 3
// The rectangle with corners [1, 5], [2, 5], [1, 2], and [2, 2] has the minimum area of 3

// Solution 1: