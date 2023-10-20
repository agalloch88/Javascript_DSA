// Write a function which takes in an array of integers and returns the largest possible value for the expression array[a] - array[b] + array[c] - array[d],
// where a, b, c, and d are indices of the array, and a < b < c < d, meaning they must occur in order when traversing from left to right and may not
// be the same indexes.

// If the input array contains fewer than 4 elements, the function should return 0.

// Sample Input:
// array = [3, 6, 1, -3, 2, 7]

// Sample Output:
// 4
// choose the following indexes: a = 1, b = 3, c = 4, d = 5
// 6 - (-3) + 2 - 7 = 4

// Solution 1:

// iterative solution which checks all possible values based on previous item (a, b, or c) and evaluates expression update max variable

// O(n^4) time due to 4 nested for loops
// O(1) space due to only storing a few variables

function maximizeExpression(array) {
  // check for edge case of input less than the required 4 indexes, so return 0 if so
  if (array.length < 4) {
    return 0;
  }
  // set maximumValueFound variable to -Infinity, so any max value should update the variable on first check
  let maximumValueFound = -Infinity;
  // start iterating over the input looking at index a, which can start as early as first item in input
  for (let a = 0; a < array.length; a++) {
    // grab index a in input and store in variable aValue
    let aValue = array[a];
    // iterate over input to look for index b value, which can start right next to index a in input
    for (let b = a + 1; b < array.length; b++) {
      // grab index b in input and store in variable bValue
      let bValue = array[b];
      // iterate over input to look for index c value, which can start right next to index b in input
      for (let c = b + 1; c < array.length; c++) {
        // grab index c in input and store in variable cValue
        let cValue = array[c];
        // iterate over input to look for index d value, which can start right next to index c in input
        for (let d = c + 1; d < array.length; d++) {
          // grab index d in input and store in variable dValue
          let dValue = array[d];
          // run helper function to evaluate the expression and store return value in expressionValue variable
          let expressionValue = evaluateExpression(
            aValue,
            bValue,
            cValue,
            dValue,
          );
          // set maximumValueFound variable to the max between itself and the current expression value
          maximumValueFound = Math.max(expressionValue, maximumValueFound);
        }
      }
    }
  }
  // once done iteratig over inputs, return the maximumValueFound variable which should hold the max value from the expression
  return maximumValueFound;
}
// helper function to calculate the result of the expression
// takes in the a/b/c/d values from main function above and returns result for comparison
function evaluateExpression(a, b, c, d) {
  return a - b + c - d;
}

// Solution 2:

// iterative solution improving time complexity at expense of using n space

// O(n) time due to looping over all n inputs
// O(n) space due to storing n values from input

function maximizeExpression(array) {
  // handle edge case of less than 4 values in input, in which case return 0
  if (array.length < 4) {
    return 0;
  }
  // set new array with length 1 and populate with value at index 0 in input array, store in variable maxOfA
  let maxOfA = new Array(1).fill(array[0]);
  // set new array with length 1 and populate with value -Infinity, since do not know what A - B will be, store in variable maxOfAMinusB
  let maxOfAMinusB = new Array(1).fill(-Infinity);
  // set new array with length 2, populate with value -Infinity since do know know what A - B + C will be, store in variable maxOfAMinusBPlusC
  let maxOfAMinusBPlusC = new Array(2).fill(-Infinity);
  // set new array with length 3, populate with value -Infinity since do not know what A - B + C - D will be, store in variable maxOfAMinusBPlusCMinusD
  let maxOfAMinusBPlusCMinusD = new Array(3).fill(-Infinity);
  // iterate over input, starting at index 1
  for (let idx = 1; idx < array.length; idx++) {
    // select the maximum between value at idx in input array and maxOfA at position right behind current idx, store this value in variable currentMax
    let currentMax = Math.max(maxOfA[idx - 1], array[idx]);
    // push currentMax into maxOfA array
    maxOfA.push(currentMax);
  }
  // iterate over input, starting at index 1
  for (let idx = 1; idx < array.length; idx++) {
    // select the maximum between value of maxOfAMinusB right behind current idx, and that same value minus the value of idx in input array, store this value in variable currentMax
    let currentMax = Math.max(
      maxOfAMinusB[idx - 1],
      maxOfA[idx - 1] - array[idx],
    );
    // push currentMax value into maxOfAMinusB array
    maxOfAMinusB.push(currentMax);
  }
  // iterate over input, starting at index 2
  for (let idx = 2; idx < array.length; idx++) {
    // select the maximum between value of maxOfAMinusBPlusC right behind current idx, and that same value plus the value of idx in input array, store this value in variable currentMax
    let currentMax = Math.max(
      maxOfAMinusBPlusC[idx - 1],
      maxOfAMinusB[idx - 1] + array[idx],
    );
    // push currentMax value into maxOfAMinusBPlusC array
    maxOfAMinusBPlusC.push(currentMax);
  }
  // iterate over input, starting at index 3
  for (let idx = 3; idx < array.length; idx++) {
    // select the maximum between value of maxOfAMinusBPlusCMinusD right behind current idx, and that same value minus the value of idx in input array, store this valuue in variable currentMax
    let currentMax = Math.max(
      maxOfAMinusBPlusCMinusD[idx - 1],
      maxOfAMinusBPlusC[idx - 1] - array[idx],
    );
    // push currentMax value into maxOfAMinusBPlusCMinusD
    maxOfAMinusBPlusCMinusD.push(currentMax);
  }
  // return the last value of final array as the answer
  return maxOfAMinusBPlusCMinusD[maxOfAMinusBPlusCMinusD.length - 1];
}

// Solution 3:

// iterative solution with best-possible time and space complexity

// O(n) time due to looping over all n inputs once
// O(1) space due to only storing a few variables and not using additional data structures

function maximizeExpression(array) {
  // handle edge case of less than 4 values in input, in which case return 0
  if (array.length < 4) {
    return 0;
  }
  // set up variables for various steps of determining maximum expression, initialize all to -Infinity to accept any potential value on first comparison
  let maxOfA = -Infinity;
  let maxOfAB = -Infinity;
  let maxOfABC = -Infinity;
  let maxOfABCD = -Infinity;
  // iterate over the input array, stopping three shy of end
  for (let i = 0; i < array.length - 3; i++) {
    // set variable maxOfA equal to the maximum between current maxOfA and value at i in input array
    maxOfA = Math.max(maxOfA, array[i]);
    // set variable maxOfAB equal to the maximum between current maxOfAB and maxOfA value minus current i plus 1 in input array
    maxOfAB = Math.max(maxOfAB, maxOfA - array[i + 1]);
    // set variable maxOfABC equal to the maximum between current maxOfABC and maxOfAB plus current i plus 2 in input array
    maxOfABC = Math.max(maxOfABC, maxOfAB + array[i + 2]);
    // set variable maxOfABCD equal to the maximum between current maxOfABCD and maxOfABC minus current i plus 3 in input array
    maxOfABCD = Math.max(maxOfABCD, maxOfABC - array[i + 3]);
  }
  // since tracked the max all the way through array and expressions, return the maxOfABCD variable as it holds the absolute maximum value possible in the input
  return maxOfABCD;
}
