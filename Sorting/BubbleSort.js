// Write a function which takes in an array of integers and returns a sorted version of the
// input array. To accomplish the sort, use the Bubble Sort algorithm.

// Sample Input:
// array = [8, 5, 2, 9, 5, 6, 3]

// Sample Output:
// [2, 3, 5, 5, 6, 8, 9]

// Solution 1:

// iterative solution implementing BubbleSort and using helper swap function to 'bubble' values to end

// O(n) time in best case, O(n^2) on average and in worst case due to inefficiencies in algorithm
// O(1) space due to only storing a few variables

// main function which takes in the input array
function bubbleSort(array) {
  // set variable to determine whether input is sorted or not, start with initialized to false
  let isSorted = false;
  // set variable counter equal to zero, which will track when all input values are sorted
  // the counter serves as an optimization to tell how many values, based on large values
  // bubbling all the way to the end, do not need to be looked at on subsequent passes
  let counter = 0;
  // set up while loop to run while the input is not sorted
  while (!isSorted) {
    // assume that, maybe on current pass, input will be sorted, so set isSorted to true
    isSorted = true;
    // iterate over the array, excluding the number of items indicated in counter
    // these values are the largest values which 'bubble' to the end in Bubble Sort
    for (let i = 0; i < array.length - 1 - counter; i++) {
      // check whether the value of i in array is greater than the value at i plus 1
      // if this is true, these two values are not sorted
      if (array[i] > array[i + 1]) {
        // swap these two values using helper function
        swap(i, i + 1, array);
        // performec a swap, so set isSorted back to false to keep running
        isSorted = false;
      }
    }
    // when for loop ends, a single value should have bubbled to the end of the input array
    // increment the counter, which, on the next pass, will prevent looking at these sorted
    // values again
    counter++;
  }
  // return the sorted array, which was sorted in place
  return array;
}

// helper function which enables in-place swapping of two values which does not natively exist in JS
function swap(i, j, array) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
