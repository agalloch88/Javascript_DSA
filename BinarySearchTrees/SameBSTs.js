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

// recursive solution opting to treat ever node checked as a root node of subtree, and using min/max value bounds to account for any values out of scope for subtree

// O(n^2) time due to needing to check n possibilities n times
// O(d) space, where d is the depth of the deeper BST, due to potentially d recursive calls on the call stack at any time, which may be as good as log(n) for balanced BST

// main function which takes in the two input arrays
function sameBsts(arrayOne, arrayTwo) {
  // return a call to helper function, passing in the two input arrays, rootIdx values of 0 to start, and -Infinity/Infinity bounds for the min and max values
  return areSameBsts(arrayOne, arrayTwo, 0, 0, -Infinity, Infinity);
}

// helper function which takes in the two input arrays, rootIdx values for both arrays, and min/max values to consider
function areSameBsts(
  arrayOne,
  arrayTwo,
  rootOneIdx,
  rootTwoIdx,
  minVal,
  maxVal,
) {
  // base case checks
  // check whether either rootOneIdx or rootTwoIdx come back as -1 from helper function, and if so, execute below
  if (rootOneIdx === -1 || rootTwoIdx === -1) {
    // return a check of whether the rootOneIdx and rootTwoIdx are equal to one another, because if not, these are not the same BST's, as would expect -1 to come back for both in that situation
    return rootOneIdx === rootTwoIdx;
  }

  // check whether the root values in the arrays are not equal, in which case should return false
  if (arrayOne[rootOneIdx] !== arrayTwo[rootTwoIdx]) {
    return false;
  }

  // set up same four variables, but this time using the subtree root approach and the min/max value bounds to exclude non-relevant values
  // not creating arrays here, which is where the space savings occur
  // variables contain the return values of helper functions grabbing the idx of the first smaller or bigger/equal values
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

  // initialize variable currentValue and set equal to the rootOneIdx position in arrayOne
  let currentValue = arrayOne[rootOneIdx];
  // recursive case
  // initialize two new variables, leftAreSame and rightAreSame, to check whether those subtrees are the same via recursive calls to areSameBsts()
  // for leftAreSame, the maxVal parameter will be the currentValue
  let leftAreSame = areSameBsts(
    arrayOne,
    arrayTwo,
    leftRootIdxOne,
    leftRootIdxTwo,
    minVal,
    currentValue,
  );
  // for rightAreSame, the minVal parameter will be currentValue
  let rightAreSame = areSameBsts(
    arrayOne,
    arrayTwo,
    rightRootIdxOne,
    rightRootIdxTwo,
    currentValue,
    maxVal,
  );

  // return a check of whether leftAreSame AND rightAreSame, which will generate the answer to the question
  return leftAreSame && rightAreSame;
}

// helper function which finds idx of the first smaller value compared to the startingIdx
function getIdxOfFirstSmaller(array, startingIdx, minVal) {
  // iterate over the passed in array, starting at the next value after the startingIdx
  for (let i = startingIdx + 1; i < array.length; i++) {
    // check whether the value at i in the array is smaller than the value of startingIdx AND whether the value at i in the array is greater than or equal to the minVal constraint
    if (array[i] < array[startingIdx] && array[i] >= minVal) {
      // if both checks above are true, return the value at i for use in areSameBsts()
      return i;
    }
  }
  // if no values are found which match the conditions above, return -1 instead for use in areSameBsts()
  return -1;
}

// helper function which finds idx of the first greater or equal value compared to the startingIdx
function getIdxOfFirstBiggerOrEqual(array, startingIdx, maxVal) {
  // itarte over the passed in array, starting at the next value after the startingIdx
  for (let i = startingIdx + 1; i < array.length; i++) {
    // check whether the value at i in the array is greater than or equal to the startingIdx AND whether the value at i in the array is less than the maxVal constraint
    if ((array[i] >= array[startingIdx]) & (array[i] < maxVal)) {
      // if both checks above are true, return the value at i for use in areSameBsts()
      return i;
    }
  }
  // if no values are found which match the conditions above, return -1 instead for use in areSameBsts()
  return -1;
}
