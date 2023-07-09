// Write a function which takes in a non-empty, unordered array of positive integers, and
// which returns the array's majority element without sorting the array, and also without
// using more than constant space.

// An array's majority element is an element of the array which appears in over half of the array's
// indices. Note that the most common element of an array (meaning the element which appears
// the most times in the array) is NOT necessarily the array's majority element. For example,
// the arrays [3, 2, 2, 1] and [3, 4, 2, 2, 1] both have 2 as their most common element, yet
// neither array has a majority element, because neither 2 nor any other element appears in
// more than half of the respective arrays' indices.

// For the context of the problem, assume that the input array will always have a majority
// element.

// Sample Input:

// array = [1, 2, 3, 2, 2, 1, 2]

// Sample Output:

// 2, as 2 occurs in 4 of 7 indices, making it the majority element

// Solution 1: