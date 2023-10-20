// Write a function which takes in an array of integers, and which returns a sorted version of that array. Use the Quick Sort algorithm to sort the array.

// Sample Input:
// array = [8, 5, 2, 9, 5, 6, 3]

// Sample Output:
// [2, 3, 5, 5, 6, 8, 9]

// Solution 1:

// recursive sorting algorithm comparing left and right indexes to a pivot point to determine what to swap where, and when.

// O(n log(n)) time in best and average cases where pivot breaks array into almost-equal halves, O(n^2) time in worst case when arrays in one half are repeatedly one item long
// O(log(n)) space due to storing frames on call stack due to recursive calls

// main function which takes in the input array
function quickSort(array) {
  // call to helper function and pass in input array, 0 for startIdx, and last element in array for endIdx
  quickSortHelper(array, 0, array.length - 1);
  // since sort is done in place, simply return the array, which is now sorted using quicksort
  return array;
}
// helper function to handle majority of logic, taking in the input, a startIdx, and an endIdx
function quickSortHelper(array, startIdx, endIdx) {
  // handle edge case where 1 element input, so simply return
  if (startIdx >= endIdx) {
    return;
  }
  // set the pivot to the provided startIdx, which on first run can be 0 (assuming unsorted, random input, this is equivalent to generating a random index anyways)
  let pivotIdx = startIdx;
  // set the leftIdx directly next to the pivot
  let leftIdx = startIdx + 1;
  // set the rightIdx equal to the provided endIdx
  let rightIdx = endIdx;
  // while left and right indexes do not overlap, keep looping
  while (rightIdx >= leftIdx) {
    // if the value at leftIdx is greater than the value at the pivot AND the value at the rightIdx is smaller than the pivot value, execute a swap of the left and right index values
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      swap(leftIdx, rightIdx, array);
    }
    // if the value at leftIdx is less than or equal to the value at the pivot, increment the leftIdx by 1
    if (array[leftIdx] <= array[pivotIdx]) {
      leftIdx++;
    }
    // if the value at the rightIdx is greater than or equal to the pivot, decrement the rightIdx by 1 as this rightIdx value is already sorted respective to the pivot
    if (array[rightIdx] >= array[pivotIdx]) {
      rightIdx--;
    }
  }
  // once the while loop breaks, the left and right indexes have overlapped, so execute a swap of the pivot and rightIdx values
  swap(pivotIdx, rightIdx, array);
  // once the pivot swaps, there should now be two unsorted subarrays, so determine which is smaller to handle that one first and reduce frames on call stack
  let leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  // if the left subarray is smaller, execute below
  if (leftSubarrayIsSmaller) {
    // recursively call quickSortHelper and sort the left subarray first
    quickSortHelper(array, startIdx, rightIdx - 1);
    // once the call above returns, recursively call quickSortHelper on the right subarray
    quickSortHelper(array, rightIdx + 1, endIdx);
    // if the right subarray is smaller, execute below
  } else {
    // recursively call quickSortHelper and sort the right subarray first
    quickSortHelper(array, rightIdx + 1, endIdx);
    // once the call above returns, recursively call quickSortHelper on the left subarray
    quickSortHelper(array, startIdx, rightIdx - 1);
  }
}
// helper function to perform swaps in place, as JS does not have that built-in capability like python
function swap(i, j, array) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
