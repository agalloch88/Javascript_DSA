// Write a function that takes in a non-empty string, and which returns a boolean representing whether the string is a palindrome.

// A palindrome is defined as a string which is written the same forward and backward. Note that single-character strings are by definition palindromes.

// Sample input:
// string = "abcdcba"

// Sample output:
// true

// Solution 1:

// O(n^2) time due to for loop and equality check
// O(n) space due to building a new string based on n letters in input string

// This approach builds a new, reversed string by starting at the end of the input and moving forward, then comparing the reversedString
// and input string to see if they are equal.

function isPalindrome(string) {
    // create empty holder string
    let reversedString = '';
    // start at the end of input string, iterate forward and add values at each index to reversedString
    for (let i = string.length - 1; i >= 0; i--) {
        reversedString += string[i];
    }
    // check whether input and reversedString are equal
    return string === reversedString;
}

// Solution 2:

// O(n) time due to for loop, more efficient since using an array
// O(n) space since building new data structure containing n values from input

// This approach is similar to Solution 1, but opts to use an array to hold the values rather than a string.
// Arrays are a more efficient data structure overall than strings, but the equality check must be done between
// string and string, not string and array, so we join all of the values pushed into reversedChars to make the
// comparison.

function isPalindrome(string) {
    // create holder array for each letter
    const reversedChars = [];
    // start at end of input string and push each new value into holder array
    for (let i = string.length - 1; i >= 0; i--) {
        reversedChars.push(string[i]);
    }
    // check whether input and joined values from array are equal
    return string === reversedChars.join('');
}