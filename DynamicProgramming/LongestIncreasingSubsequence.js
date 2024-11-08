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

function longestIncreasingSubsequence(array) {
  let sequences = new Array(array.length);
  let lengths = array.map((num) => 1);
  let maxLengthIdx = 0;

  for (let i = 0; i < array.length; i++) {
    let currentNum = array[i];

    for (let j = 0; j < i; j++) {
      let otherNum = array[j];

      if (otherNum < currentNum && lengths[j] + 1 >= lengths[i]) {
        lengths[i] = lengths[j] + 1;
        sequences[i] = j;
      }
    }
    if (lengths[i] >= lengths[maxLengthIdx]) {
      maxLengthIdx = i;
    }
  }
  return buildSequence(array, sequences, maxLengthIdx);
}

function buildSequence(array, sequences, currentIdx) {
  let sequence = [];

  while (currentIdx != undefined) {
    sequence.unshift(array[currentIdx]);
    currentIdx = sequences[currentIdx];
  }
  return sequence;
}
