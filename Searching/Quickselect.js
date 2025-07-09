// Write a function which takes in an array of distinct integers, as well as an integer k, and which returns the kth smallest integer in the input array.

// The function should complete the search in linear time, on average.

// Sample Input:
// array = [8, 5, 2, 9, 7, 6, 3]
// k = 3

// Sample Output:
// 5

// Solution 1:

// iterative solution which uses the quicksort methodology to arrange/sort the inputs such than can ultimately compare rightIdx to k position and determine answer

// O(n) time in best and average cases, O(n^2) in worst case if repeatedly end up with 1-item arrays to work with
// O(1) space due to only storing a few variables

// main function which primarily handles return from helper
function quickselect(array, k) {
  // since using zero-base array numeration, need to adjust the k to handle this easily, and store this inside variable position
  let position = k - 1;
  // return the value returned from helper function which takes in the input array, startIdx, endIdx, and the newly-stored position value from above
  return quickselectHelper(array, 0, array.length - 1, position);
}

// helper function to perform the quickselect logic, which is analogous to quicksort functionality but slightly modified
function quickselectHelper(array, startIdx, endIdx, position) {
  // set up while loop to keep iterating over values
  while (true) {
    // this is a base case which should never occur, that being the startIdx and endIdx overlapping, so throw an error with a message just in case
    if (startIdx > endIdx) {
      throw new Error('The algorithm should never arrive here!');
    }
    // set up the pivotIdx which can simply set to the startIdx, and assuming the input is randomly arranged, should be equivalent to executing a randomize function to select start point
    let pivotIdx = startIdx;
    // set up leftIdx, which should be directly to the right of the pivot
    let leftIdx = startIdx + 1;
    // set up rightIdx at the last element of input array to start
    let rightIdx = array.length - 1;
    // while the leftIdx is not past the rightIdx, keep looping
    while (leftIdx <= rightIdx) {
      // if the value at leftIdx is greater than the pivot value AND the value at rightIdx is less than the value at the pivot, execute below
      if (
        array[leftIdx] > array[pivotIdx] &&
        array[rightIdx] < array[pivotIdx]
      ) {
        // execute swap function to swap the value at the left and right index pointers
        swap(leftIdx, rightIdx, array);
      }
      // if the value at the leftIdx is less than or equal to the pivot value, increment the leftIdx, as the leftIdx value is in correct position respective to pivot
      if (array[leftIdx] <= array[pivotIdx]) {
        leftIdx++;
      }
      // if the rightIdx is greater than or equal to the pivot, decrement the rightIdx, as the rightIdx value is in the correct position respective to pivot
      if (array[rightIdx] >= array[pivotIdx]) {
        rightIdx--;
      }
    }
    // once the while loop breaks, should be in a position to swap the pivot and rightIdx values
    swap(pivotIdx, rightIdx, array);
    // if the rightIdx is at the k position being looked for, execute below
    if (rightIdx === position) {
      return array[rightIdx];
      // if rightIdx is not at position and is instead less than position, set startIdx equal to rightIdx plus one, as can discard values to the left of that point
    } else if (rightIdx < position) {
      startIdx = rightIdx + 1;
      // if rightIdx is not at position and is instead greater than position, set startIdx equal to rightIdx minus one, as can discard values to the right of that point
    } else {
      endIdx = rightIdx - 1;
    }
  }
}
// helper function to handle swaps as JS does not have an in-built way to do this as in python
function swap(i, j, array) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

// Solution 2:

function quickselect(array, k) {
  let position = k - 1;
  return quickselectHelper(array, 0, array.length - 1, position);
}

function quickselectHelper(array, startIdx, endIdx, k) {
  let pivot = array[endIdx];
  let leftArr = [];
  let rightArr = [];

  for (let i = startIdx; i < endIdx; i++) {
    if (array[i] < pivot) {
      leftArr.push(array[i]);
    } else {
      rightArr.push(array[i]);
    }
  }

  let pi = leftArr.length;
  array = [...leftArr, pivot, ...rightArr];

  if (k < pi) {
    return quickselectHelper(array, startIdx, leftArr.length - 1, k);
  } else if (k > pi) {
    return quickselectHelper(array, startIdx, endIdx, k);
  } else {
    return pivot;
  }
}
