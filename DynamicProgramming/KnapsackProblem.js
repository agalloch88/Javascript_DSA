// The problem presents an array of arrays, where each subarray holds two integer values
// which represent an item. The first integer is the item's value, and the second integer is the
// item's weight. Also provided is an integer representing the maximum capacity of a knapsack
// which can hold items.

// The goal is to fit items into the knapsack without havinf the sum of the item's weights execeed
// the knapsack's capacity, all while maximizing the combined value of items stored in the
// knapsack. Note that only one of each item is available.

// Write a function which returns the maximized combined value of the items which should
// be stored in the knapsack, as well as an array of the indices of each selected item.

// If there are multiple combinations of items which maximize the total value inside the 
// knapsack, the function may return any of those combinations.

// Sample Input:

// items = [[1, 2], [4, 3], [5, 6], [6, 7]]
// capacity = 10

// Sample Output:

// [10, [1, 3]], which are items [4, 3] and [6, 7]

// Solution 1: