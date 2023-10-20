// You're given an array of integers, and another array of three distinct integers. The
// first array is guaranteed to contain only integers found in the second array, and the
// second array represents a desired order for integers in the first array.

// For example, the second array of [x, y, z] represents a desired order of
// [x, x, ..., x, y, y, ..., y, z, z, ..., z] in the first array.

// Write a function which sorts the first array according to the desired order in the second
// array. The function should perform this in place (so, should not mututate the input array)
// and it shouldn't use any auxiliary space (so, solution should run in O(1) space).

// Note that the desired order won't necessarily be ascending or descending, and that the first
// array won't necessarily contain all three integers found in the second array. It may
// only contain one or two of the given integers.

// Sample input:
// array = [1, 0, 0, -1, -1, 0, 1, 1]
// order = [0, 1, -1]

// Sample output:
// [0, 0, 0, 1, 1, 1, -1, -1]

// All solutions have same Big O:
// O(n) time due to looping over inputs at least once
// O(1) space, per requirements, as no additional data structures are used and sorted in place

// Solution 1:
// This solution takes a bucket approach, essentially counting how many values are present in the array for
// each value in the order.

function threeNumberSort(array, order) {
  const valueCounts = [0, 0, 0];

  for (const element of array) {
    const orderIdx = order.indexOf(element);
    valueCounts[orderIdx]++;
  }

  for (let idx = 0; idx < 3; idx++) {
    const value = order[idx];
    const count = valueCounts[idx];

    const numElementsBefore = valueCounts
      .slice(0, idx)
      .reduce((a, b) => a + b, 0);
    for (let n = 0; n < count; n++) {
      const currentIdx = numElementsBefore + n;
      array[currentIdx] = value;
    }
  }

  return array;
}

// Solution 2:
// This solution employs a forward and backward pass to bring all first-position instances to front,
// and push all last-position instances to end of array.

function threeNumberSort(array, order) {
  const firstValue = order[0];
  const thirdValue = order[2];

  let firstIdx = 0;
  for (let idx = 0; idx < array.length; idx++) {
    if (array[idx] === firstValue) {
      swap(firstIdx, idx, array);
      firstIdx++;
    }
  }

  let thirdIdx = array.length - 1;
  for (let idx = array.length - 1; idx > -1; idx--) {
    if (array[idx] === thirdValue) {
      swap(thirdIdx, idx, array);
      thirdIdx--;
    }
  }

  return array;
}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

// Solution 3:
// This option does a single pass of the array, and uses three pointers to determine where
// array items should be positioned

function threeNumberSort(array, order) {
  const firstValue = order[0];
  const secondValue = order[1];

  let firstIdx = 0;
  let secondIdx = 0;
  let thirdIdx = array.length - 1;

  while (secondIdx <= thirdIdx) {
    const value = array[secondIdx];
    if (value === firstValue) {
      swap(firstIdx, secondIdx, array);
      firstIdx++;
      secondIdx++;
    } else if (value === secondValue) {
      secondIdx++;
    } else {
      swap(secondIdx, thirdIdx, array);
      thirdIdx--;
    }
  }

  return array;
}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
