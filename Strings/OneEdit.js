// The problem presents two strings, stringOne and stringTwo. Write a function which determines if these two strings can be made equal using only one edit.

// There are three possible edits to make:
// * REPLACE: One character in one string is swapped for a different character.
// * ADD: One character is added at any index in one of the strings.
// * REMOVE: One character is removed at any index in one of the strings.

// Note that both strings will contain at least one character. If the strings are the same, the function should return true.

// Sample Input:
// stringOne = "hello"
// stringTwo = "hollo"

// SampleOutput:
// True
// A single replace at index one of either string will make the strings equal.

// Solution 1:

// iterative solution utilizing lengths and slices to determine if One Edit is possible, and if so, which string should be modified

// O(n + m) time due to checking n characters in stringOne and m characters in stringTwo
// O(n + m) space due to storing copies of strings and slices

function oneEdit(stringOne, stringTwo) {
  // grab the length of stringOne and store inside variable lengthOne
  let lengthOne = stringOne.length;
  // grab the length of stringTwo and store inside variable lengthTwo
  let lengthTwo = stringTwo.length;
  // check whether the absolute value difference between the strings is greater than one, because if so, no possible way to do the One Edit operation, so return false
  if (Math.abs(lengthOne - lengthTwo) > 1) {
    return false;
  }
  // iterate over the smaller string
  for (let i = 0; i < Math.min(lengthOne, lengthTwo); i++) {
    // if the value at position in in the two strings is not the same, this is a potential spot to swap, add, or delete
    if (stringOne[i] !== stringTwo[i]) {
      // if stringOne is the longer string, execute the below
      if (lengthOne > lengthTwo) {
        // return the check of whether the slice of string one from position i plus 1 is equal to the slice of string 2 from i
        return stringOne.slice(i + 1) === stringTwo.slice(i);
        // otherwise, if stringTwo is longer, execute the below
      } else if (lengthTwo > lengthOne) {
        // return the check of whether the slice of stringOne from position i is equal to the slice of stringTwo from position i plus 1
        return stringOne.slice(i) === stringTwo.slice(i + 1);
        // if neither above block was true, must be dealing with strings of the same length, so execute below
      } else {
        // return the check of whether slice of stringOne from position i plus 1 is equal to slice of string two from position i plus 1
        return stringOne.slice(i + 1) === stringTwo.slice(i + 1);
      }
    }
  }
  // if the for loop exits without returning, then return true
  return true;
}

// Solution 2:

// iterative solution tracking current index in each string, and whether an edit is made

// O(n) time due to interating over n total characters across the shorter string
// O(1) space due to only storing a few variables

function oneEdit(stringOne, stringTwo) {
  // grab length of stringOne and store in variable lengthOne
  let lengthOne = stringOne.length;
  // grab length of stringTwo and store in variable lengthTwo
  let lengthTwo = stringTwo.length;
  // check whether the absolute value difference between the string lengths is greater than one, and if so, no viable solution, so return false
  if (Math.abs(lengthOne - lengthTwo) > 1) {
    return false;
  }
  // create variable madeEdit and set to false at outset
  let madeEdit = false;
  // set up variables indexOne and indexTwo which will hold current position in each string, initialize them to index 0 at start
  let indexOne = 0;
  let indexTwo = 0;
  // keep looping so long as the indexes are less than the lengths of the strings, meaning still in bounds
  while (indexOne < lengthOne && indexTwo < lengthTwo) {
    // if the value at indexOne in stringOne is NOT equal to the value at indexTwo in string two, then execute block below
    if (stringOne[indexOne] !== stringTwo[indexTwo]) {
      // check whether an edit has already occurred by checking this variable, and if so, one change was already made and no more are possible within
      // scope of the problem, so therefore, return false
      if (madeEdit) {
        return false;
      }
      // if madeEdit was still false, then set it to true, as this is the first difference/discrepancy within the strings and is the "One Edit" to make
      madeEdit = true;
      // if the stringOne is longer than stringTwo, then execute below and increment indexOne by 1
      if (lengthOne > lengthTwo) {
        indexOne++;
        // otherwise, if stringTwo is longer than stringOne, then execute below and increment indexTwo by 1
      } else if (lengthTwo > lengthOne) {
        indexTwo++;
        // if the two above conditions did not execute, this means the strings are equal length, so increment both indexes by 1
      } else {
        indexOne++;
        indexTwo++;
      }
      // if the values at the respective indexes IS the same, then increment each index by one and check again
    } else {
      indexOne++;
      indexTwo++;
    }
  }
  // if the while loop exits, this means the problem is solveable by making the One Edit, so return true
  return true;
}
