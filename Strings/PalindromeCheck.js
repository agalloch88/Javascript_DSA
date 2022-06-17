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
    // start at the end of input string, iterate forward and pop values at each index to reversedString
    for (let i = string.length - 1; i >= 0; i--) {
        reversedString += string[i];
    }
    // check whether input and reversedString are equal
    return string === reversedString;
}