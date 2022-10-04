// Write a function which, given an input string, returns its longest palindromic substring.

// A palidrome is defined as a string of characters which is written the same forward and backward. Note that, in the context of the problem, single-character strings
// are palindromes.

// For the context of the problem, assume there will only be one longest palindromic substring.

// Sample Input:
// string = "abaxyzzyxf"

// Sample Output:
// "xyzzyx"

// Solution 1:

function longestPalindromicSubstring(string) {
    let longest = '';
    for (let i = 0; i < string.length; i++) {
        for (let j = i; j < string.length; j++) {
            let substring = string.slice(i, j + 1);
            if (substring.length > longest.length && isPalindrome(substring)) {
                longest = substring;
            }
        }
    }
    return longest;
}

function isPalindrome(string) {
    let leftIdx = 0;
    let rightIdx = string.length - 1;
    while (leftIdx < rightIdx) {
        if (string[leftIdx] !== string[rightIdx]) {
            return false;
        }
        leftIdx++;
        rightIdx--;
    }
    return true;
}