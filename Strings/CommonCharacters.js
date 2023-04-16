// Write a function which takes in a non-empty array of non-empty strings, and which returns an array of characters common to all strings in the array, ignoring multiplicity.

// Note that the strings are not guaranteed to only contain alphanumeric characters. The array returned by the function can be in any order.

// Sample Input:

// strings = ["abc", "bcd", "cbaccd"]

// Sample Output:

// ["b", "c"]

// Solution 1:

// iterative solution using JS object to store characters, respective counts, then checking if count matches total number of strings to determine whether common

// O(n * m) time, due to checking n words with at most m characters ion the longest string
// O(c) space, where c is the number of unique characters across all the strings, due to storing in object and new array

function commonCharacters(strings) {
    // initialize empty JS object characterCounts which will hold characters and count of how many strings the character appears across
    let characterCounts = {};
    // iterate over every string in the strings input array
    for (let string of strings) {
        // initialize variable uniqueStringCharacters as a new Set containing the characters of current string
        let uniqueStringCharacters = new Set(string);
        // iterate over every character in the uniqueStringCharacters Set
        for (let character of uniqueStringCharacters) {
            // if the current character is not already in the characterCounts JS object, then insert the character as the key with a value of 0
            if (!(character in characterCounts)) {
                characterCounts[character] = 0;
            }
            // increment the current character in characterCounts JS object by 1
            characterCounts[character]++;
        }
    }
    // initialize empty array finalCharacters which will hold characters common across all the strings
    let finalCharacters = [];
    // iterate over every character and count key/value for each entry in the characterCounts JS object
    for (let [character, count] of Object.entries(characterCounts)) {
        // if the entry for count is equal to the length of the strings input array, this means the character appears in every input string and should be returned
        if (count === strings.length) {
            // push this character into finalCharacters
            finalCharacters.push(character);
        }
    }
    // return the finalCharacters array containing the common characters in each string within strings input
    return finalCharacters;
}

// Solution 2:

function commonCharacters(strings) {
    let smallestString = getSmallestString(strings);
    let potentialCommonCharacters = new Set(smallestString);

    for (let string of strings) {
        removeNonexistentCharacters(string, potentialCommonCharacters);
    }
    return Array.from(potentialCommonCharacters);
}

function getSmallestString(strings) {
    let smallestString = strings[0];
    for (let string of strings) {
        if (string.length < smallestString.length) {
            smallestString = string;
        }
    }
    return smallestString;
}

function removeNonexistentCharacters(string, potentialCommonCharacters) {
    let uniqueStringCharacters = new Set(string);

    for (let character of Array.from(potentialCommonCharacters)) {
        if (!uniqueStringCharacters.has(character)) {
            potentialCommonCharacters.delete(character);
        }
    }
}