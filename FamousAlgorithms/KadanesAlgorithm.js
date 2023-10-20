// Write a function that takes in a non-empty array of integers, and returns the maximum sum which can be obtained by summing up all
// of the integers in a non-empty subarray of the input array. A subarray must only contain adjacent numbers, so, numbers next to
// each other in the input array.

// The best way to solve this problem is by employing Kadane's Algorithm.

// Sample input:
// array = [3, 5, -9, 1, 3, -2, 2, 4, 7, 2, -9, 6, 3, 1, -5, 4]

// Sample output:
// 19
// found in the sequence [1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1]

// Solution 1:

// To break down the algorithm, essentially, it checks if the sum of values up to maxEndingHere is less than the current num,
// or if we can keep adding to the sequence. It then checks whether the maxSoFar is greater than maxEndingHere or not.

// O(n) time due to single pass through n values in input array
// O(1) space due to only storing three variable values

function kadanesAlgorithm(array) {
  let maxEndingHere = array[0];
  let maxSoFar = array[0];

  for (let i = 1; i < array.length; i++) {
    const num = array[i];
    maxEndingHere = Math.max(num, maxEndingHere + num);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}
