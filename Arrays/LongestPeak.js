// Write a function which takes in an array of integers and returns the length of the longest peak ih the array.

// A peak is defined as adjacent integers in the array which are STRICTLY increasing until they reach a tip (the highest value in the peak),
// at which point they become STRICTLY decreasing. A peak must be formed by at least three integers, such as [4, 6, 3].

// For example, the integers [1, 4, 10, 2] form a peak, but the integers [4, 0, 10] do not, and neither do the integers [1, 2, 2, 0].
// Similarly, the integers [1, 2, 3] do not form a peak because there are no strictly-decreasing integers after the 3.

// Sample Input:
// array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]

// Sample Output:
// 6 with the numbers [0, 10, 6, 5, -1, -3]

// Solution 1:

// O(n) time due to single pass over input array
// O(1) space due to only storing handful of variables for n inputs

function longestPeak(array) {
  // set variable to track the longest peak
  let maxLongestPeak = 0;
  // start at index 1 and start looking for peaks
  let i = 1;
  // while within the bounds of the input, keep iterative
  while (i < array.length - 1) {
    // check whether value behind i in array is less than value at i, and value after i is smaller
    let isPeak = array[i - 1] < array[i] && array[i + 1] < array[i];
    // if not at a peak, increment i by 1 and continue on
    if (!isPeak) {
      i++;
      continue;
    }
    // set variable for leftSlope, which is equal to i - 2
    let leftSlope = i - 2;
    // while leftSlope is in bounds of array, and the value at leftSlope is less than the value to
    // right of leftSlope, decrement leftSlope
    while (leftSlope >= 0 && array[leftSlope] < array[leftSlope + 1]) {
      leftSlope--;
    }
    // set value for rightSlope, which is equal to i + 2
    let rightSlope = i + 2;
    // while rightSlope is in bounds of array, and the value of rightSlope is smaller than
    // the value to the left of rightSlope, increment rightSlope
    while (
      rightSlope < array.length &&
      array[rightSlope] < array[rightSlope - 1]
    ) {
      rightSlope++;
    }
    // calculate rightSlope - leftSlope, subtract an additional 1 to properly account
    let currentPeakLength = rightSlope - leftSlope - 1;
    // set maxLongestPeak to the larger absolute value of maxLongestPeak and currentPeakLength,
    // which at first comparison will default to currentPeakLength
    maxLongestPeak = Math.abs(maxLongestPeak, currentPeakLength);
    // set i equal to rightSlope for the next comparison
    i = rightSlope;
  }
  // return the longest peak found in the input
  return maxLongestPeak;
}

// Solution 2:

function longestPeak2(array) {
  let maxLength = 0;
  let count = 1;

  for (let i = 1; i < array.length - 1; i++) {
    if (array[i - 1] < array[i] && array[i] > array[i + 1]) {
      let j = i;
      let k = i;

      while (array[j - 1] < array[j]) {
        j--;
        count++;
      }

      while (array[k] > array[k + 1]) {
        k++;
        count++;
      }
    }
    maxLength = Math.max(maxLength, count);
    count = 1;
    i = k;
  }
  return maxLength;
}
