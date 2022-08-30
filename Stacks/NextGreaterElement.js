// Write a function which takes in an array of integers and returns a new array containing, at each index, the next element in the input array which is greater
// than the element at that index in the input array.

// In other words, the function should return a new array where outputArray[i] is the next element in the input array which is greater than inputArray[i].
// If there is no such next greater element for a particular index, the value at that index in the output array should be -1. For example, given the array = [1, 2],
// the function should return [2, -1].

// Additionally, the function should treat the array as a circular array. A circular array wraps around itself as if it were connected end-to-end. So, the next index after the
// last index in a circular array is the first index. This means that, for the given problem, if the input array = [0, 0, 5, 0, 0, 3, 0, 0], the next greater element after
// 3 is 5, since the array is circular.

// Sample Input:
// array = [2, 5, -3, -4, 6, 7, 2]

// Sample Output:
// [5, 6, 6, 6, 7, -1, 5]

// Solution 1: