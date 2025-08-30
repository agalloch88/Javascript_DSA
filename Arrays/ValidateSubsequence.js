// Given two non-empty arrays of integers, write a function that determines whether the second array is a subsequence of the first.

// A subsequence of an array is a set of numbers that aren't necessarily adhacent in the array, but that are in the same order as
// they appear in the array. For instance, the numbers [1, 3, 4] form a subsequence of the array [1, 2, 3, 4], and so do the
// numbers [2, 4]. Note that a single number in an array, and the array itself, are both valid subsequences of the array.

// Sample input:
// array = [5, 1, 22, 25, 6, -1, 8, 10]
// sequence = [1, 6, -1, 10]

// Sample output:
// true

// Solution 1:

// iterative solution tracking indexes within the array and sequence and checking if sequence index matches sequence length at end

// O(n) time due to single pass over array & sequence
// O(1) space as only storing index values, regardless of array/sequence size

function isValidSubsequence(array, sequence) {
  // initialize variable arrIdx to track array index and set to 0
  let arrIdx = 0;
  // initialize variable seqIdx to track sequence index and also set to 0
  let seqIdx = 0;
  // while arrIdx is less than the length of the array AND seqIdx is less than the length of the sequence, keep looping
  while (arrIdx < array.length && seqIdx < sequence.length) {
    //if the value at arrIdx in the array is equal to the value at seqIdx in the sequence, execute the below
    if (array[arrIdx] === sequence[seqIdx]) {
      // if the above if statement is true, increment the seqIdx by 1 to then check the next value between the array and sequence
      seqIdx++;
    }
    // regardless of whether if block above executes, increment the arrIdx by 1
    arrIdx++;
  }
  // once while loop breaks, return the evaluation of the check as to whether the seqIdx is equal to the length of the sequence, meaning, if true, it would be at the end and a subsequence of the array
  return seqIdx === sequence.length;
}

// Solution 2:

// iterative solution only tracking the position in the sequence, as this is the crucial metric

// O(n) time due to single pass over input array
// O(1) space due to storing single value for sequence position

function isValidSubsequence2(array, sequence) {
  // initialize variable seqIdx to track sequence index, and set to 0
  let seqIdx = 0;
  // loop over every value in the input array
  for (const value of array) {
    // should the seqIdx ever equal the sequence length, the sequence is validated and can break out of the for loop
    if (seqIdx === sequence.length) {
      break;
    }
    // if the value at seqIdx in the sequence is equal to the current value in the array, increment the seqIdx by 1 as there's a match
    if (sequence[seqIdx] === value) {
      seqIdx++;
    }
  }
  // return the evaluation of the check as to whether the seqIdx is equal to the length of the sequence, meaning, if true, it would be at the end and a subsequence of the array
  return seqIdx === sequence.length;
}

// Solution 3:

// iterative solution using forEach array method and tracking subsequence via a counter

// O(n) time due to iterating over every item in array
// O(1) space due to only storing counter variable

function isValidSubsequence3(array, sequence) {
  // set up variable counter to track how many matches found, and initialize to 0
  let counter = 0;
  // loop over array using the forEach array method, and for every num encountered, check whether that num is equal to the same index position in the sequence
  // if so, increment the counter value by 1
  array.forEach((num) => num === sequence[counter] && counter++);
  // return the evaluation value of checking whether the value for counter now matches the sequence length
  return counter === sequence.length;
}
