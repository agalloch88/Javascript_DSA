// Write a function which takes in an array of integers, and returns the number of invesrions in the array. An inversion occurs if, for any valid indices
// i and j, i < j and array[i] > array[j].

// For example, given array = [3, 4, 1, 2], there are 4 inversions. The following pairs of indices represent these inversions:

// [0, 2], [0, 3], [1, 2], [1, 3]

// Intuitively, the number of inversions is a measure of the level of unsortedness of the array's contents.

// Sample input:

// array = [2, 3, 3, 1, 9, 5, 6]

// Sample Output:

// 5
// These are the pairs of indices representing inversions in this input:
// [0, 3], [1, 3], [2, 3], [4, 5], [4, 6]

// Solution 1:

// recursive solution counting inversions within subarrays then merging and adding inversions

// O(n(log(n))) time due to recursive merge sort
// O(n) space due to storing sorted array

function countInversions(array) {
  // return call to helper function, passing in input array, start index of 0, and end index of array
  return countSubArrayInversions(array, 0, array.length);
}

// helper function which takes in the array, start index, and end index
function countSubArrayInversions(array, start, end) {
  // if end is less than or equal to start, return 0
  if (end - start <= 1) {
    return 0;
  }

  // calculate middle index
  let middle = start + Math.floor((end - start) / 2);
  // recursive call to function, passing in array, start index, and middle index
  let leftInversions = countSubArrayInversions(array, start, middle);
  // recursive call to function, passing in array, middle index, and end index
  let rightInversions = countSubArrayInversions(array, middle, end);
  // call to helper function, passing in array, start index, middle index, and end index
  let mergeInversions = mergeSortAndCountInversions(array, start, middle, end);

  // return sum of leftInversions, rightInversions, and mergeInversions
  return leftInversions + rightInversions + mergeInversions;
}

// helper function which takes in the array, start index, middle index, and end index
function mergeSortAndCountInversions(array, start, middle, end) {
  // initialize variables
  let sortedArray = [];
  let left = start;
  let right = middle;
  let inversions = 0;

  // while left index is less than middle index and right index is less than end index, keep looping
  while (left < middle && right < end) {
    // if value at left index is less than or equal to value at right index, add value at left index to sorted array, and increment left index
    if (array[left] <= array[right]) {
      sortedArray.push(array[left]);
      left++;
      // if value at left index is greater than value at right index, add value at right index to sorted array, increment right index, and add middle - left to inversions
    } else {
      inversions += middle - left;
      sortedArray.push(array[right]);
      right++;
    }
  }

  // add remaining values to sorted array
  sortedArray.push(...array.slice(left, middle), ...array.slice(right, end));
  // copy values from sorted array back into input array
  for (let idx = 0; idx < sortedArray.length; idx++) {
    const num = sortedArray[idx];
    array[start + idx] = num;
  }

  return inversions;
}

// Solution 2:

// iterative solution using merge sort
// no need to create and loop through a new array each time. the aux array is passed by ref

// O(n(log(n))) time due to recursive merge sort
// O(n) space due to storing sorted array

function countInversions(array) {
  let aux = array.slice();
  let inversions = { val: 0 };

  mergeSortAndCountInversions(array, aux, 0, array.length - 1, inversions);

  return inversions.val;
}

function mergeSort(array, aux, start, end, inversions) {
  if (start >= end) {
    return;
  }

  let mid = Math.floor((start + end) / 2);
  mergeSort(aux, array, start, mid, inversions);
  mergeSort(aux, array, mid + 1, end, inversions);

  let left = start;
  let right = mid + 1;
  let idx = start;
  let leftSize = mid - start + 1;

  while (left <= mid && right <= end) {
    if (aux[right] < aux[left]) {
      array[idx++] = aux[right++];
      inversions.val = inversions.val + leftSize;
    } else {
      array[idx++] = aux[left++];
      leftSize--;
    }
  }

  while (left <= mid) {
    array[idx++] = aux[left++];
  }

  while (right <= end) {
    array[idx++] = aux[right++];
  }
}
