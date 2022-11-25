// Write a function that takes in a string of lowercase, English-alphabet, non-symbol, non-numeric characters
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

// iterative solution reducing time complexity by using JS object to store frequencies of all alphabet characters

// O(n) time due to single pass over string
// O(1) space, even though we are using JS object, it will hold max of 26 values
// since this is constant, regardless of string length, this equates to O(1)

function firstNonRepeatingCharacter(string) {
    // set up empty JS object and store in variable characterFrequencies
    const characterFrequencies = {};
    // iterate over every character in the string
    for (const character of string) {
        // if the character is not present in characterFrequencies JS object yet, add it and set count to 0
        if (!(character in characterFrequencies)) {
            characterFrequencies[character] = 0;
        }
        // increment the frequency count of the current character by 1
        characterFrequencies[character]++;
    }
    // iterate over every item in the string again
    for (let idx = 0; idx < string.length; idx++) {
        // grab the value at idx in the string, and store in the variable character
        const character = string[idx];
        // if the value of the specific character being looked at is equal to 1, this character does not repeat and is the answer
        if (characterFrequencies[character] === 1) {
            // return this idx, as it is the answer
            return idx;
        }
    }
    // should the if block above never trigger, there are no non-repeating characters, so return -1
    return -1;
}