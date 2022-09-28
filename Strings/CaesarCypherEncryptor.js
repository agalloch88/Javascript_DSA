// Given a non-empty string of lowercase letters and a non-negative integer representing a key, write a function that returns a new string obtained by 
// shifting every letter in the input string by k positions in the alphabet, where k is the key.

// Note that letters should "wrap" around the alphabet, so the letter z shifted by one returns the letter a.

// Sample input:
// string = "xyz"
// key = 2

// Sample output:
// "zab"

// Solution 1:

// This solution deals with unicode values, and calculating those values, so relies on knowledge of how to manipulate unicode.

// O(n) time due to single for loop pass over n items in string
// O(n) space due to storing n items from string in new array

function caesarCypherEncryptor(string, key) {
    // define holder array
    const newLetters = [];
    // as key may be larger than 26, figure out exact placement in alphabet using modulo
    const newKey = key % 26;
    // loop over input string, calling helper method to get shifted letter and push it to holder array
    for (const letter of string) {
        newLetters.push(getNewLetter(letter, newKey));
    }
    // join items in array back to string and return
    return newLetters.join('');
}

function getNewLetter(letter, key) {
    // figure out what the new character code should be
    const newLetterCode = letter.charCodeAt() + key;
    // if code is <= 122, can convert to string right away, otherwise start from right before 'a' and add remainder from newLetterCode % 122
    return newLetterCode <= 122 ? String.fromCharCode(newLetterCode) : String.fromCharCode(96 + (newLetterCode % 122));
}

// Solution 2:

// Similar to solution 1, but we create an array of all alphabet letters rather than dealing with unicode values.

// O(n) time due to looping over n values in input string
// O(n) space due to storing values in new array

function caesarCypherEncryptor(string, key) {
    // set up holder array 
    let newLetters = [];
    // set up modulo'd key value in case it is greater than 26
    let newKey = key % 26;
    // set alphabet variable equal to string of letters, then split them
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    // iterate over every letter of the input string
    for (let letter of string) {
        // push into newLetters holder array the result of helper function taking in the given letter, the newKey, and the alphabet string
        newLetters.push(getNewLetter(letter, newKey, alphabet));
    }
    // return the joined newLetters result for the shifted/encoded message
    return newLetters.join('');
}
// helper function which shifts an individual letter
function getNewLetter(letter, key, alphabet) {
    // set variable newLetterCode equal to the result in the alphabet at the given letter index plus the key value, which tells how many positions to shift for encoding
    let newLetterCode = alphabet.indexOf(letter) + key;
    // return result in alphabet at index newLetterCode modulo'd by 26
    return alphabet[newLetterCode] % 26;
}