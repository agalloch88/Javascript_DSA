// Given a non-empty string of lowercase letters and a non-negative integer representing a key, write a function that returns a new string obtained by 
// shifting every letter in the input string by k positions in the alphabet, where k is the key.

// Note that letters should "wrap" around the alphabet, so the letter z shifted by one returns the letter a.

// Sample input:
// string = "xyz"
// key = 2

// Sample output:
// "zab"

// Solution 1:

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
    // if code is <= 122, can convert to string right aray, otherwise start from right before 'a' and add remainder from newLetterCode % 122
    return newLetterCode <= 122 ? String.fromCharCode(newLetterCode) : String.fromCharCode(96 + (newLetterCode % 122));
}