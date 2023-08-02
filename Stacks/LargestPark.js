// A city wants to build a new public park, and the problem requires finding the largest park the city can build without disturbing existing infrastructure.

// Write a function which takes in a two-dimensional array (also known as a matrix), called land, which represents the total land of the city from a top-down perspective. Each value in the land
// input is a boolean. False values are pieces of land not currently in use, while true values are pieces of land currently in use by other infrastructure. The function should return
// the area of the largest possible park.

// The largest possible park will be placed exclusively on unused land, meaning only on false value plots. Moreover, the city requires the park to be a perfect rectangle. If there is
// no available land meeting this requirement, the function should return 0.

// Sample Input:

// land = [
//  [false, true, true, true, false],
//  [false, false, false, true, false],
//  [false, false, false, false, false],
//  [false, true, true, true, true],
// ]

// Sample Output:
// 6
// The park would go from row 1 to row 2, in columns 0 to 3, giving a total area of 6

// Solution 1: