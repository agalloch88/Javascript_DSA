// Write a function which, given an input string, returns its longest palindromic substring.

// A palidrome is defined as a string of characters which is written the same forward and backward. Note that, in the context of the problem, single-character strings
// are palindromes.

// For the context of the problem, assume there will only be one longest palindromic substring.

// Sample Input:
// string = "abaxyzzyxf"

// Sample Output:
// "xyzzyx"

// Solution 1:

// iterative solution looping over every value using two pointers and checking palindrome

// O(n^3) time due to nested for loops, additional checks within loops
// O(n) space due to storing potentially up to n-length longest substring

function longestPalindromicSubstring(string) {
    // initialize variable to store longest substring when one is found or needs to be updated
    let longest = '';
    // set i variable at beginning of string and iterate over every value
    for (let i = 0; i < string.length; i++) {
        // set j variable at beginning of string and also iterate over every value
        for (let j = i; j < string.length; j++) {
            // initialize variable for the substring, set that equal to the input string sliced from position
            // i to position j + 1
            let substring = string.slice(i, j + 1);
            // check if the substring length is longer than the longest length, and if the return result
            // from helper function isPalindrome is true, then set longest equal to this substring
            if (substring.length > longest.length && isPalindrome(substring)) {
                longest = substring;
            }
        }
    }
    // after checking all possible values, return the substring stored in longest
    return longest;
}
// helper function to check whether an input is a palindrome
function isPalindrome(string) {
    // initialize variables for leftIdx at start of string, rightIdx at end of string
    let leftIdx = 0;
    let rightIdx = string.length - 1;
    // while these variables do not overlap, keep checking
    while (leftIdx < rightIdx) {
        // if, at any point, the values at leftIdx and rightIdx do not match, return false, as it's
        // not a palindrome
        if (string[leftIdx] !== string[rightIdx]) {
            return false;
        }
        // if above if block not triggered, increment leftIdx and decrement rightIdx and keep checking
        leftIdx++;
        rightIdx--;
    }
    // if while loop breaks and never trigger if block, the string is a palindrome, so return true
    // for use in above function checks
    return true;
}