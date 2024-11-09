// Given a non-empty array of integers, write a function which returns the longest strictly-increasing
// subsequence in the array.

// A subsequence of an array is a set of numbers which are not necessarily adjacent in the array,
// but are in the same order as they appear in the array. For example, the numbers [1, 3, 4] form
// a subsequence of the array [1, 2, 3, 4], and so do the numbers [2, 4]. Note that a single
// numbwer in an array, and the array itself, are both valid subsequences of the array.

// For the purposes of the problem, assume there will only be one longest increasin subsequence.

// Sample Input:

// array = [5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]

// Sample Output:

// [-24, 2, 3, 5, 6, 35]

// Solution 1:

// iterative solution comparing values and building list of indexes, then reconstructing indexes for solution

// O(n^2) time due to nested for loops and iterating over input array to find increasing sequences
// O(n) space due to storing sequences and lengths arrays

function longestIncreasingSubsequence(array) {
  // `sequences` keeps track of the indices of the previous elements
  // for reconstructing the longest subsequence
  let sequences = new Array(array.length);

  // `lengths` keeps track of the length of the longest subsequence ending at each index
  let lengths = array.map((num) => 1);

  // `maxLengthIdx` stores the index of the maximum length found
  let maxLengthIdx = 0;

  // Iterate over each element to find the longest increasing subsequence
  for (let i = 0; i < array.length; i++) {
    let currentNum = array[i];

    // Check all previous elements to see if they form an increasing subsequence
    for (let j = 0; j < i; j++) {
      let otherNum = array[j];

      // Check if `otherNum` is less than `currentNum` and if updating
      // `lengths[i]` would increase the subsequence length
      if (otherNum < currentNum && lengths[j] + 1 >= lengths[i]) {
        // Update the length of the subsequence at `i`
        lengths[i] = lengths[j] + 1;

        // Store the index of the element that allows extending the sequence
        sequences[i] = j;
      }
    }

    // Update the `maxLengthIdx` if a new longest subsequence is found
    if (lengths[i] >= lengths[maxLengthIdx]) {
      maxLengthIdx = i;
    }
  }

  // Reconstruct and return the longest increasing subsequence
  return buildSequence(array, sequences, maxLengthIdx);
}

function buildSequence(array, sequences, currentIdx) {
  let sequence = [];

  // Follow the `sequences` array to build the actual subsequence
  while (currentIdx != undefined) {
    sequence.unshift(array[currentIdx]); // Add the current element to the start of the sequence
    currentIdx = sequences[currentIdx]; // Move to the previous index in the sequence
  }

  return sequence;
}
