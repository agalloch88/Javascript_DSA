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

function oneEdit(stringOne, stringTwo) {
    let lengthOne = stringOne.length;
    let lengthTwo = stringTwo.length;

    if (Math.abs(lengthOne - lengthTwo) > 1) {
        return false;
    }

    for (let i = 0; i < Math.min(lengthOne, lengthTwo); i++) {
        if (stringOne[i] !== stringTwo[i]) {
            if (lengthOne > lengthTwo) {
                return stringOne.slice(i + 1) === stringTwo.slice(i);
            } else if (lengthTwo > lengthOne) {
                return stringOne.slice(i) === stringTwo.slice(i + 1);
            } else {
                return stringOne.slice(i + 1) === stringTwo.slice(i + 1);
            }
        }
    }
    return true;
}