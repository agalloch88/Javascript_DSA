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

// Solution 2:

// O(n^2) time due to for loop with nested recursive calls
// O(n) space due to storing vars, longest lengths

function longestPalindromicSubstring(string) {
    // initialize currentLongest variable, set to first two positions and then will update
    let currentLongest = [0, 1];
    // starting looping over string starting from positions i/1 until end
    for (let i = 1; i < string.length; i++) {
        // account for odd vs even input lengths, which will change how a palindrome looks (x vs xx center value)
        // via helper function recursive calls
        let odd = getLongestPalindromeFrom(string, i - 1, i + 1);
        let even = getLongestPalindromeFrom(string, i - 1, i);
        // calculate the longest to determine whether odd or even
        let longest = odd[1] - odd[0] > even[1] - even [0] ? odd : even;
        // update current longest if longest is longer, otherwise stick with currentLongest values
        currentLongest = currentLongest[1] - currentLongest[0] > longest[1] - longest[0] ? currentLongest : longest;
    }
    // return slice of string from first position to last position of currentLongest pair
    return string.slice(currentLongest[0], currentLongest[1]);
}
// helper function to determine length of palindrome, taking in input, leftIdx/start and rightIdx/end
function getLongestPalindromeFrom(string, leftIdx, rightIdx) {
    // while leftIdx and rightIdx are in bounds, keep checking
    while (leftIdx >= 0 && rightIdx < string.length) {
        // if values at these indexes do not match, break out of while loop
        if (string[leftIdx] !== string[rightIdx]) {
            break;
        }
        // increment leftIdx, decrement rightIdx until while loop breaks
        leftIdx++;
        rightIdx--;
    }
    // return new values to then set to odd/even vars, and eventually to longest for comparison against
    // the currentLongest values
    return [leftIdx + 1, rightIdx];
}