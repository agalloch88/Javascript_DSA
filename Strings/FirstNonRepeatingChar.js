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

// O(n^2) time due to nested for loops, passing over each string value
// O(1) space due to no additional data structures

function firstNonRepeatingCharacter(string) {
    for (let idx = 0; idx < string.length; idx++) {
        let isRepeating = false;
        for (let idx2 = 0; idx2 < string.length; idx2++) {
            if (string[idx] === string[idx2] && idx !== idx2) {
                isRepeating = true;
            }
        }
        if (!isRepeating) {
            return idx;
        }
    }
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