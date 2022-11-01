// Write a function which takes in an array of integers and returns the largest possible value for the expression array[a] - array[b] + array[c] - array[d],
// where a, b, c, and d are indices of the array, and a < b < c < d, meaning they must occur in order when traversing from left to right and may not
// be the same indexes.

// If the input array contains fewer than 4 elements, the function should return 0.

// Sample Input:
// array = [3, 6, 1, -3, 2, 7]

// Sample Output:
// 4
// choose the following indexes: a = 1, b = 3, c = 4, d = 5
// 6 - (-3) + 2 - 7 = 4

// Solution 1: