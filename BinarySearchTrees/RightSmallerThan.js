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

function rightSmallerThan(array) {
  return array.map((inputValue, inputIndex) =>
    array.reduce((numOfSmaller, valueReduce, indexReduce) => {
      let isLeft = inputIndex > indexReduce;

      if (isLeft) {
        return numOfSmaller;
      }

      let isValueSmaller = valueReduce < inputValue;
      return numOfSmaller + isValueSmaller;
    }, 0),
  );
}
