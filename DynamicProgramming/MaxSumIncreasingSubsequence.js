// Write a function which takes in a non-empty array of integers, and which returns the greatest sum which can be generated from a strictly-increasing subsequence in the array,
// as well as an array of the numbers in that subsequence. This means that, in the context of the problem, two numbers of equal value which occur subsequently in the array
// are not technically an increasing subsequence.

// A subsequence of an array is a set of numbers which are not necessarily adjacent in the array, but which are in the same order as they appear in the array. For instance, the 
// numbers [1, 3, 4] form a subsequence of the array [1, 2, 3, 4], and so do the numbers [2, 4]. Note that a single number in an array, and the array itself, are both valid 
// subsequences of a given array.

// For the context of the problem, it is safe to assume there will only be one increasing subsequence with the greatest sum.

// Sample Input:
// array = [10, 70, 20, 30, 50, 11, 30]

// Sample Output:
// [110, [10, 20, 30, 50]]
// The subsequence listed above is strictly-increasing and yields the largest sum of all strictly-increasing subsequences found in the input array

// Solution 1: