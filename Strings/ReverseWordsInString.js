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
    // set up empty string to hold reversed string, store in variable reverse
    let reverse = '';
    // start at last character in input string, store in variable i
    let i = string.length - 1;
    // set up empty string to hold current word, store in variable currentWord
    let currentWord = '';
    // start looping over input string so long as i is greater than or equal to 0, so still in bounds
    while (i >= 0) {
        // grab the value of i in string, and store in variable char
        let char = string[i];
        // if the char is equal to a space, then execute block below
        if (char === ' ') {
            // add value of currentWord plus a space to the current string in reverse
            reverse += currentWord + ' ';
            // once currentWord added to reverse, reset currentWord to empty string, as on to next word
            currentWord = '';
        // if the char is equal to anything other than a space, execute the block below
        } else {
            // set currentWord equal to the current value in variable char plus current value in currentWord
            currentWord = char + currentWord;
        }
        // decrement i by 1
        i--;
    }
    // return the value in reverse plus whatever is still in currentWord
    return reverse + currentWord;
}

// Solution 2:

// Another variation on previous solution using a reverse helper method, but a bit more cumbersome and verbose.

// O(n) time, even though it's technically two passes, so it simplifies to n
// O(n) space due to storing n words in array prior to joining

function reverseWordsInString(string) {
    // set up empty array to hold the words and store in variable words
    const words = [];
    // set variable startOfWord equal to 0
    let startOfWord = 0;
    // start looping over the input string, starting at index 0
    for (let idx = 0; idx < string.length; i++) {
        // grab value at current idx in input string, and store in variable char
        const char = string[idx];
        // if the current value of char is a space, execute the block below
        if (char === ' ') {
            // take slice of string from startOfWord up to the current idx, and push this value into words
            words.push(string.slice(startOfWord, idx));
            // set the startOfWord value equal to current idx
            startOfWord = idx;
        // if the value at the startOfWord current value in string is equal to a space, execute the block below
        } else if (string[startOfWord] === ' ') {
            // push a space into words array
            words.push(' ');
            // set startOfWord equal to current idx
            startOfWord = idx;
        }
    }
    // take slice of string from current value of startOfWord and push into words array
    words.push(string.slice(startOfWord));
    // call helper function to reverse the words array, passing in said words array
    reverseList(words);
    // return the joined array of words as string
    return words.join('');
}

// helper function to handle the reversing of the array items manually, taking in an array/list
// procedure similar to setting up swap functionality in JS
function reverseList(list) {
    // set variable start equal to 0
    let start = 0;
    // set variable end equal to index at very end of array
    let end = list.length -1;
    // loop over items in array so long as start is less than end value
    while (start < end) {
        // set variable temp equal to the value at position start in input array/list
        const temp = list[start];
        // set value at position start equal to value at position end
        list[start] = list[end];
        // set value at position end equal to value in variable temp
        list[end] = temp;
        // increment start by 1
        start++;
        // decrement end by 1
        end--;
    }
}

// Solution 3:

// O(n) time due to iterating once over string
// O(n) space due to storing n characters from nput string

function reverseWordsInString(string) {
    const characters = [];
    for (const char of string) {
        characters.push(char);
    }
    reverseListRange(characters, 0, string.length - 1);

    let startOfWord = 0;
    while (startOfWord < characters.length) {
        let endOfWord = startOfWord;
        while (endOfWord < characters.length && characters[endOfWord] !== ' ') {
            endOfWord++;
        }

        reverseListRange(characters, startOfWord, endOfWord - 1);
        startOfWord = endOfWord + 1;
    }
    return characters.join('');
}

function reverseListRange(list, start, end) {
    while (start < end) {
        const temp = list[start];
        list[start] = list[end];
        list[end] = temp;
        start++;
        end--;
    }
}