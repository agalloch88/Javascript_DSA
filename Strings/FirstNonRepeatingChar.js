// Write a function that takes in a string of lowercase, English-alphabet, non-symbol non-numeric characters
// and returns the index of the string's first non-repeating chacter.
// The first non-repeating character is the first character in the string
// which occurs only once.

// If the input string does not have any non-repeating characters, your function
// should return -1.

// Sample input:
// string = "abcdcaf"

// Sample Output:
// 1
// the first non-repeating character is 'b', and is found at index 1

// Solution 1:

// iterative solution using two pointers to compare values

// O(n^2) time due to nested for loops, passing over each string value
// O(1) space due to no additional data structures

function firstNonRepeatingCharacter(string) {
    // start iterating over the input string from the first index
    for (let idx = 0; idx < string.length; idx++) {
        // set up boolean variable to determine whether character value repeats or not
        let isRepeating = false;
        // set up second for loop iterating over input string to compare values, starting at first index
        for (let idx2 = 0; idx2 < string.length; idx2++) {
            // if the values at idx and idx2 in input string are the same and idx and idx2 are not at the same index, found a repeating character
            if (string[idx] === string[idx2] && idx !== idx2) {
                // set isRepeating equal to true now
                isRepeating = true;
            }
        }
        // if at any point isRepeating switches back to false, return that idx value as this is the answer
        if (!isRepeating) {
            return idx;
        }
    }
    // if isRepeating never switches back to false, return -1 as there are no non-repeating characters
    return -1;
}

// Solution 2:

// O(n) time due to single pass over string
// O(1) space, even though we are using JS object, it will hold max of 26 values
// since this is constant, regardless of string length, this equates to O(1)

function firstNonRepeatingCharacter(string) {
    const characterFrequencies = {};

    for (const character of string) {
        if (!(character in characterFrequencies)) {
            characterFrequencies[character] = 0;
        }
        characterFrequencies[character]++;
    }

    for (let idx = 0; idx < string.length; idx++) {
        const character = string[idx];
        if (characterFrequencies[character] === 1) {
            return idx;
        }
    }

    return -1;
}