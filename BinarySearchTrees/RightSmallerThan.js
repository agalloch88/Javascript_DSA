// Write a function which takes in an array of integers, and returns an array of the same length, where each element in the output array corresponds to the number of integers
// in the input array that are to the right of the relevant index, and that are strictly smaller than the integer at that index.

// In other words, the value at output[i] represents the number of inntegers that are to the right of i, and that are strictly smaller than input[i].

// Sample Input:

// array = [8, 5, 11, -1, 3, 4, 2]

// Sample Output:

// [5, 4, 4, 0, 1, 1, 0]
// There are 5 integers smaller than 8 which are to the right of 8
// There are 4 integers smaller than 5 which are to the right of 5
// There are 4 integers smaller than 11 which are to the right of 11
// There are 0 integers smaller than -1 which are to the right of -1
// There is only 1 integer smaller than 3 which is to the right of 3
// There is only 1 integer smaller than 4 which is to the right of 4
// There are 0 integers smaller than 2 which are to the right of 2

// Solution 1:

// iterative solution utilizing the map and reduce methods

// O(n^2) time due to mapping over inputs, then reducing values
// O(n) space due to returning array of length n for right smaller than values

function rightSmallerThan(array) {
  // Iterate over each element of the array using map, where inputValue is the current element and inputIndex is its index
  return array.map(
    (inputValue, inputIndex) =>
      // Use reduce to accumulate the count of elements to the right of the current element that are smaller
      array.reduce((numOfSmaller, valueReduce, indexReduce) => {
        // Check if the current element in reduce (valueReduce) is to the right of the map's current element
        let isLeft = inputIndex > indexReduce;
        // If valueReduce is to the left or at the same position, skip it (do not increase the count)
        if (isLeft) {
          return numOfSmaller;
        }
        // Check if the current element in reduce is smaller than the current element in map
        let isValueSmaller = valueReduce < inputValue;
        // Increase the count (numOfSmaller) if valueReduce is smaller, else keep it the same
        return numOfSmaller + isValueSmaller;
      }, 0), // Initial count is set to 0
  );
}

// Solution 2:

// simplistic but suboptimal solution looking at all remaining values for each index

// O(n^2) time due to nested for loops
// O(n) space due to returning new array of length n

function rightSmallerThan(array) {
  // initialize variable rightSmallerCounts which will hold the answers for each index, and set equal to an empty array
  let rightSmallerCounts = [];

  // loop over the input array for every index
  for (let i = 0; i < array.length; i++) {
    // initialize variable rightSmallerCount, and set equal to 0 at the outset
    let rightSmallerCount = 0;

    // loop over every remaining index for each value of i
    for (let j = i + 1; j < array.length; j++) {
      // if the value at j in the array is smaller than the value at i in the array, increment rightSmallerCount by 1
      if (array[j] < array[i]) {
        rightSmallerCount++;
      }
    }
    // once the inner for loop above finishes, push the cumulative value of rightSmallerCount into the rightSmallerCounts array
    rightSmallerCounts.push(rightSmallerCount);
  }
  // once outer for loop finishes, return the rightSmallerCounts array, which should hold the answers for each index
  return rightSmallerCounts;
}
