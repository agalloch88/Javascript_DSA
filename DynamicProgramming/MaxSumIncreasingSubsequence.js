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

// iterative solution using a couple extra arrays to track total sums, and the index trail of increasing subsequences to build that subsequence easily for return

// O(n^2) time due to nested for loops, looking over the values twice
// O(n) space due to extra arrays, 3n converges to n

function maxSumIncreasingSubsequence(array) {
  // set up holder array for the sequences to track of index values for increasing subsequence, all values initially undefined
  let sequences = new Array(array.length);
  // set up sums array to keep track of the current sum for increasing subsequences, minimum value is the value at that index
  let sums = array.map((num) => num);
  // keep track of where the last value is for the maximum sum subsequence, so it's known where to start from and work backwards in sums array
  let maxSumIdx = 0;
  // set up first for loop to look over entire input array
  for (let i = 0; i < array.length; i++) {
    // initialize variable currentNum to grab value in array at position i
    let currentNum = array[i];
    // set up second for loop to look over input array up to position i
    for (let j = 0; j < i; j++) {
      // initialize variable otherNum to grab value in array at position j
      let otherNum = array[j];
      // if the otherNum value is smaller than currentNum, and value of position j in sums plus the currentNum is greater or equal to sums value at position i,
      // this is an increasin subsequence, so update the toal sum in sums array at position i to equal this value
      if (otherNum < currentNum && sums[j] + currentNum >= sums[i]) {
        sums[i] = sums[j] + currentNum;
        // also update sequences array to reflect a new addition to the sequence, and set position i equal to j and link them together
        sequences[i] = j;
      }
    }
    // if the current subsequence sum at position i is greater than the subsequence sum stored in the value at maxSumIdx in sums, update maxSumIdx to equal position i
    if (sums[i] >= sums[maxSumIdx]) {
      maxSumIdx = i;
    }
  }
  // return the value at maxSumIdx, plus the return result of helper function which builds the sequence
  return [sums[maxSumIdx], buildSequence(array, sequences, maxSumIdx)];
}
// helper function which takes in the input array, sequences array built in function above, and maxSumIdx for last position of the subsequence
function buildSequence(array, sequences, currentIdx) {
  // set up empty holder array for the sequence to build and return from this function
  let sequence = [];
  // while loop which looks at the items in the sequence, and once it reaches an undefined value, will break out as the subsequence is finished
  while (currentIdx !== undefined) {
    // unshift the value at currentIdx into sequence holder array, which allows to build the sequence in reverse without having to do an additional reversing step
    sequence.unshift(array[currentIdx]);
    // after unshifting currentIdx, move to the next index value
    currentIdx = sequences[currentIdx];
  }
  // return completed sequence at the end
  return sequence;
}
