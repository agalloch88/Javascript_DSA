// Write a function which takes in a non-empty array of non-negative integers, and a non-negative integer representing a target sum. The function should find the longest subarray where the values collectively
// sum up to equal the target sum. The function should return an array containing the starting and ending index of this subarray, both inclusive.

// If there is no subarray which sums up to the target sum, the function should return an empty array. For the purposes of the problem, assume the given inputs will only ever have one answer.

// Sample Input:

// array = [1, 2, 3, 4, 3, 3, 1, 2, 1, 2]
// targetSum = 10

// Sample Output:

// [4, 8]
// The longest subarray which sums to 10 starts at index 4 (3) and ends at index 8 (1), meaning 3 + 3 + 1 + 2 + 1

// Solution 1:

// iterative but sub-optimal solution checking all possible subarrays

// O(n ^ 2) time due to nested for loops
// O(1) space due to only storing indices and a few variables

function longestSubarrayWithSum(array, targetSum) {
  // initialize variable indices and set equal to an empty array
  // if solution is never found, this will fulfill requirement of returning an empty array
  let indices = [];
  // iterate over the input array starting at index 0 with variable startingIndex
  for (let startingIndex = 0; startingIndex < array.length; startingIndex++) {
    // initialize variable currentSubarraySum to track the total of subarray
    let currentSubarraySum = 0;
    // iterate over the input array starting at the startingIndex with variable endingIndex
    for (
      let endingIndex = startingIndex;
      endingIndex < array.length;
      endingIndex++
    ) {
      // add the current value at endingIndex in input array to the current value stored in currentSubarraySum
      currentSubarraySum += array[endingIndex];
      // check whether the value stored in currentSubarraySum is equal to the targetSum value
      if (currentSubarraySum === targetSum) {
        // if there are currently no indices, or if the length of subarray from current startingIndex and current endingIndex is greater than the length currently stored in indices
        // then update indices with the current values of startingIndex and endingIndex
        if (
          indices.length === 0 ||
          indices[1] - indices[0] < endingIndex - startingIndex
        ) {
          indices = [startingIndex, endingIndex];
        }
      }
    }
  }
  // return the values stored in indices variable, if any
  return indices;
}

// Solution 2:

// improved solution reducing time complexity via sliding window approach

// O(n) time due to moving the window of possible subarrays and doing one pass over entire input
// O(1) space due to only storing indices and a few variables

function longestSubarrayWithSum(array, targetSum) {
  // initialize variable indices and set equal to an empty array
  // can simply return this variable if no suitable longest subarray is found in the one pass over input
  let indices = [];
  // initialize variable currentSubarraySum to track total of the subarray within the window, setting to 0 at outset
  let currentSubarraySum = 0;
  // initialize variables startingIndex and endingIndex to track the current window start and end, setting both to zero at outset
  let startingIndex = 0;
  let endingIndex = 0;
  // keep looping so long as endingIndex is in bounds of the end of the input array
  while (endingIndex < array.length) {
    // increment currentSubarraySum value by the value at endingIndex in the array
    currentSubarraySum += array[endingIndex];
    // keep looping so long as startingIndex is less than endingIndex AND the currentSubarraySum is greater than the targetSum, meaning window needs to shrink
    while (startingIndex < endingIndex && currentSubarraySum > targetSum) {
      // decrement the currenSubarraySum total by the value at startingIndex in the array
      currentSubarraySum -= array[startingIndex];
      //   move startingIndex forward by one position
      startingIndex++;
    }
    // if currentSubarraySum equals targetSum, found a possible longest subarray, so execute the below
    if (currentSubarraySum === targetSum) {
      // if indices is still empty, meaning this is the first pass, OR if the length of the current subarray in indices is smaller than the current window from startingIndex to endingIndex,
      // then update indices to be the pair of current startingIndex and endingIndex values
      if (
        indices.length === 0 ||
        indices[1] - indices[0] < endingIndex - startingIndex
      ) {
        indices = [startingIndex, endingIndex];
      }
    }
    // increment endingIndex by 1, enlarging the window
    endingIndex++;
  }
  // once both while loops are broken, should be at the end of the input array after a single pass and have result, so return whatever values, if any, are inside the indices variable
  return indices;
}
