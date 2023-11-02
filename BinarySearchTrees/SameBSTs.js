// An array of integers is said to represent the Binary Search Tree (BST) obtained by inserting each integer in the array, from left to right, into the BST.

// Write a function which takes in two arrays of integers and determines whether these arrays represent the same BST. Note that the problem does NOT allow for the
// construction of any BST's within the solution.

// A BST is a Binary Tree which consists only of BST nodes. A node is said to be a valid BST node if and only if it satisfies the BST property: its value is
// strictly greater than the values of every node to its left, its value is less than or equal to the values of every node to its right, and its children nodes
// are either valid BST nodes themselves, or None/null.

// Sample Input:

// arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11]
// arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81]

// Sample Output:

// true
// both arrays represent the BST below:
//          10
//         /  \
//        8    15
//       /    /  \
//      5    12  94
//     /    /    /
//    2    11   81

// Solution 1:

// recursive solution doing initial edge case checks then traversing root nodes to determine whether BST's contain the same elements

// O(n^2) time due to needing to check n possibilities n times
// O(n^2) space due to creating n holder arrays for n values

// main functions which takes in the two arrays representing the theoretical BST's to compare
function sameBsts(arrayOne, arrayTwo) {
  // base/edge cases
  // check whether the two arrays/BST's are different lengths
  // if so, these are not the same as there are extra or missing elements, so return false
  if (arrayOne.length !== arrayTwo.length) {
    return false;
  }

  // check whether the lengths of the input arrays are at 0, meaning all values are processed, and if so, this is an indication the BST's are the same, so return true
  if (arrayOne.length === 0 && arrayTwo.length === 0) {
    return true;
  }

  // check whether the first values in the two arrays/BST's are the same
  // this is the root of the entire BST, so if these values differ, there is no possible way for it to be the same BST, so return false
  if (arrayOne[0] !== arrayTwo[0]) {
    return false;
  }

  // the remaining logic after the initial edge case checks involves splitting the two arrays into smaller/left subtree values, and bigger or equal/right subtree values
  // initialize the requisite variables, then call helper functions
  // these helper functions will get all the values smaller than root in each array, and all bigger or equal values compared to root in each array
  let leftOne = getSmaller(arrayOne);
  let leftTwo = getSmaller(arrayTwo);
  let rightOne = getBiggerOrEqual(arrayOne);
  let rightTwo = getBiggerOrEqual(arrayTwo);

  // recursive case
  // return recursive calls to sameBsts:
  // will check that the leftOne and leftTwo portions are the same AND the rightOne and rightTwo portions are the same
  // otherwise, if any element is false, this statement will return false
  return sameBsts(leftOne, leftTwo) && sameBsts(rightOne, rightTwo);
}

// helper function which takes in a specific array and will find all the values smaller than the root/zero index of the BST/array
function getSmaller(array) {
  // initialize variable smaller and set equal to an empty array
  let smaller = [];

  // iterate over all values in the input array, starting at index 1 since index 0 is already known
  for (let i = 1; i < array.length; i++) {
    // check whether the value at index i is less than the value at index 0, and if so, push this value into the smaller holder array
    if (array[i] < array[0]) {
      smaller.push(array[i]);
    }
  }
  // return the smaller array for use in the main function
  return smaller;
}

// helper function which takes in a specific array and willfind all the values bigger than or equal to the root/zero index of the BST/array
function getBiggerOrEqual(array) {
  // initialize variable biggerOrEqual and set equal to an empty array
  let biggerOrEqual = [];

  // iterate over all values in the input array, starting at index 1 since index 0 is already known
  for (let i = 1; i < array.length; i++) {
    // check whether the value at index i is bigger than or equal to the value at index 0, and if so, push this value into the biggerOrEqual holder array
    if (array[i] >= array[0]) {
      biggerOrEqual.push(array[i]);
    }
  }
  // return the biggerOrEqual array for use in the main function
  return biggerOrEqual;
}

// Solution 2:

function sameBsts(arrayOne, arrayTwo) {
  return areSameBsts(arrayOne, arrayTwo, 0, 0, -Infinity, Infinity);
}

function areSameBsts(
  arrayOne,
  arrayTwo,
  rootOneIdx,
  rootTwoIdx,
  minVal,
  maxVal,
) {
  if (rootOneIdx === -1 || rootTwoIdx === -1) {
    return rootOneIdx === rootTwoIdx;
  }

  if (arrayOne[rootOneIdx] !== arrayTwo[rootTwoIdx]) {
    return false;
  }

  let leftRootIdxOne = getIdxOfFirstSmaller(arrayOne, rootOneIdx, minVal);
  let leftRootIdxTwo = getIdxOfFirstSmaller(arrayTwo, rootTwoIdx, minVal);
  let rightRootIdxOne = getIdxOfFirstBiggerOrEqual(
    arrayOne,
    rootOneIdx,
    maxVal,
  );
  let rightRootIdxTwo = getIdxOfFirstBiggerOrEqual(
    arrayTwo,
    rootTwoIdx,
    maxVal,
  );

  let currentValue = arrayOne[rootOneIdx];
  let leftAreSame = areSameBsts(
    arrayOne,
    arrayTwo,
    leftRootIdxOne,
    leftRootIdxTwo,
    minVal,
    currentValue,
  );
  let rightAreSame = areSameBsts(
    arrayOne,
    arrayTwo,
    rightRootIdxOne,
    rightRootIdxTwo,
    currentValue,
    maxVal,
  );

  return leftAreSame && rightAreSame;
}

function getIdxOfFirstSmaller(array, startingIdx, minVal) {
  for (let i = startingIdx + 1; i < array.length; i++) {
    if (array[i] < array[startingIdx] && array[i] >= minVal) {
      return i;
    }
  }
  return -1;
}

function getIdxOfFirstBiggerOrEqual(array, startingIdx, maxVal) {
  for (let i = startingIdx + 1; i < array.length; i++) {
    if ((array[i] >= array[startingIdx]) & (array[i] < maxVal)) {
      return i;
    }
  }
  return -1;
}
