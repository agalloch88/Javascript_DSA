// The problem presents a string of available characters, and a string representing a document which must be generated. Write a function which determines if the document can be generated using
// the available characters. If it can be generated, the function should return true. Otherwise, it should return false.

// The document can only be generated if the frequency of unique characters in the characters string is greater than or equal to the frequency of unique characters in the document string.
// For example, given characters = 'abcabc' and document = 'aabbccc', the document CANNOT be generated as there is a missing 'c' in the provided characters string.

// The document which must be generated may contain any characters, including special characters, capital letters, numbers, and spaces.

// Note: an empty string is always able to be generated ('').

// Sample Input:
// characters = "Bste!hetsi ogEAxpelrt x"
// document = "AlgoExpert is the Best!"

// Sample Output:
// true

// Solution 1:

// iterative solution counting frequencies of characters in characters and document inputs, then comparing them

// O(m * (n + m)) time due to comparing the two strings for each item in document repeatedly
// O(1) space due to only storing a few variables and frequency for each value

// main function taking in the provided characters and document strings
function generateDocument(characters, document) {
    // iterating over each single character in the provided document, need to compare frequency of the specific character between input characters and input document
    for (let character of document) {
        // set variable documentFrequency equal to result of helper function counting frequency of specific character in input document
        let documentFrequency = countCharacterFrequency(character, document);
        // set variable charactersFrequency equal to result of helper function counting frequency of specific character in input characters
        let charactersFrequency = countCharacterFrequency(character, characters);
        // if, for any character in the input document, there is a higher count in the document than what is provided in the input characters, return false, since the document cannot be generated
        if (documentFrequency > charactersFrequency) {
            return false;
        }
    }
    // if both inputs were iterated successfully and the if condition above never triggered, document can be generated from input characters, so return true
    return true;
}
// helper function solely responsible for targeting a specific character and counting the frequency of the specific character
function countCharacterFrequency(character, target) {
    // initialize frequency variable to 0
    let frequency = 0;
    // for every character in the target, do stuff
    for (let char of target) {
        // if the current char is equal to the character currently being looked at, increment the frequency of that char by 1
        if (char === character) {
            frequency++;
        }
    }
    // return the frequency of this char so it can be compared across the characters and document in above function
    return frequency;
}

// Solution 2:

// iterative solution similar to the above, but using JS Set to track characters seen

// O(c * (n + m)) time due to iterating on c unique characters n number of characters times for a document of m length
// O(c) space due to storing c number of unique character records in the JS Set

function generateDocument(characters, document) {
    // create variable to store a new Set, which will contain the already-counted characters
    let alreadyCounted = new Set();
    // for every character in the document, do some checks
    for (let character of document) {
        // if this character is in the alreadyCounted set already, just continue
        if (character in alreadyCounted) {
            continue;
        }
        // store results of countCharacterFreqeuncy in variable for documentFrequency of this character
        let documentFrequency = countCharacterFrequency(character, document);
        // store results of countCharacterFreqeuncy in variable for charactersFrequency of this character
        let charactersFrequency = countCharacterFrequency(character, characters);
        // if higher count for the character in document than the characters input, cannot generate the document so return false
        if (documentFrequency > charactersFrequency) {
            return false;
        }
        // add this character to the alreadyCounted Set, and go on to the next
        alreadyCounted.add(character);
    }
    // if made it all the way through without returning false, then can generate the document from provided characters, so return true
    return true;
}
// helper function solely responsible for targeting a specific character and counting the frequency of the specific character
function countCharacterFrequency(character, target) {
    // set variable frequency to 0
    let frequency = 0;
    // for every char in the target, check to see if the char matches the character, and if so, increment the frequency
    for (let char of target) {
        if (char === character) {
            frequency++;
        }
    }
    // return the frequency for this character in the target
    return frequency;
}

// Solution 3:

function generateDocument(characters, document) {
    let characterCounts = {};

    for (let character of characters) {
        if (!(character in characterCounts)) {
            characterCounts[character] = 0;
        }
        characterCounts[character]++;
    }

    for (let character of document) {
        if (!(character in characterCounts) || characterCounts[character] === 0) {
            return false;
        }
        characterCounts[character]--;
    }

    return true;
}