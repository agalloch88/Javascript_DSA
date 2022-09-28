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

function generateDocument(characters, document) {
    for (let character of document) {
        let documentFrequency = countCharacterFrequency(character, document);
        let charactersFrequency = countCharacterFrequency(character, characters);

        if (documentFrequency > charactersFrequency) {
            return false;
        }
    }
    return true;
}

function countCharacterFrequency(character, target) {
    let frequency = 0;

    for (let char of target) {
        if (char === target) {
            frequency++;
        }
    }
    return frequency;
}