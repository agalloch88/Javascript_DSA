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