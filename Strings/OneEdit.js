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