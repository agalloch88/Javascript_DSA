// Write a function that takes in a string of words separated by one or more whitespaces, and returns a string which has those words in reverse order. For example,
// given the string "tim is great", the function should return "great is tim".

// For this problem, a word can contain special characters, punctuation, and numbers. The words in the string will be separated by one or more whitespaces,
// and the reversed string must contain the same whitespaces as the original string. For example, given the string "whitespaces    4", the function
// should return "4    whitespaces".

// Note that the solution cannot use any built-in split or reverse methods/functions. However, it may employ the built-in join method/function. Also
// note that the input string isn't guaranteed to always contain words, and may be empty.

// Sample input:
// string = "DSA is the best!"

// Sample output:
// "best! the is DSA"

// Solution 1:

// Simplistic but effective approach, building the string from the end and iterating over the input.

// O(n) time due to single pass of string inside while loop
// O(n) space due to storing n values from input string

function reverseWordsInString(string) {
    let reverse = '';

    let i = string.length - 1;
    let currentWord = '';
    while (i >= 0) {
        let char = string[i];
        if (char === ' ') {
            reverse += currentWord + ' ';
            currentWord = '';
        } else {
            currentWord = char + currentWord;
        }
        i--;
    }
    return reverse + currentWord;
}