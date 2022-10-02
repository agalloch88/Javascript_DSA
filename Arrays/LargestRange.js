// Write a function which takes in an array of integers, and returns an array of length 2 which represemts the largest range of integers contained in that array. 
// The range, for example [0, 5], should represent the continuity of integers found in the input array. For the example [0, 5], this means the digits 0, 1, 2, 3, 4, and 5
// are all contained somewhere within the input array.

// The first number in the output array should be the first number in the range, and the second number should be the final number in the range.

// A range of numbers is defined as a set of numbners which come right after each other in the set of real integers. For instance, the output array [2, 6] represents
// the range {2, 3, 4, 5, 6}, which is a range of length 5. Note that numbers need not be sorted or adjacent in the input array to constitute or form a range of numbers.

// For the context of the problem, assume that there will only be one largest range within the input array. There may be several different ranges, but only one which is largest.

// Sample Input:
// array = [1, 11, 2, 0, 15, 5, 2, 4, 10, 7, 12, 6]

// Sample Output:
// [0, 7]

// Solution 1: